from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver import ActionChains
import time
import sqlite3
from sqlite3 import OperationalError, IntegrityError

# Setup webdriver
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')
actions = ActionChains(driver)

# Setup connection to database
conn = sqlite3.connect("sneakers.db")
c = conn.cursor()

def create_db_table():
    try:
        c.execute("""CREATE TABLE sneakers (
            url text primary key,
            brand text,
            model text,
            size real,
            current_price real,
            old_price real,
            image text
        )""")
        conn.commit()

        c.execute("""CREATE INDEX url ON sneakers (url);""")
        conn.commit()
    except OperationalError:
        pass


def item_info(item):
    """ Returns a dictionary containing the given sneakers information.

    Arguments:
        (WebElement) item: A specific webelement w/the feed-item class.

    Returns:
        (Dict) info: A dictionary containing all of the information the item.
    """

    info = {"brand": item.find('p', {'class': 'listing-designer truncate'}).text,
            "model": item.find('p', {'class': 'truncate listing-title'}).text,
            "size": float(item.find('p', {'class': 'listing-size sub-title'}).text)}

    try:
        price = float(item.find('p', {'class': 'sub-title original-price'}).text[1:].replace(',', ''))
        old_price = None
    except AttributeError:
        price = float(item.find('p', {'class':'sub-title new-price'}).text[1:].replace(',', ''))
        old_price = float(item.find('p', {'class':'sub-title original-price strike-through'}).text[1:].replace(',', ''))
    info["price"] = price
    info["old_price"] = old_price

    try:
        img = item.find('img')['src']
    except TypeError:
        img = "N/A"
    info["img"] = img

    return info


def insert_items(feed):
    """ Inserts feed items into db.

    Loops through all items in the feed and inserts them into the db
    if they don't already exist. If a certain item already exists in the db,
    it updates price if it has changed.

    Arguments:
        List[WebElement] feed: A list containing every pair of Air Jordans on Grailed.

    Returns:
        No return value.
    """

    for item in feed:
        # Get link (PRIMARY KEY)
        try:
            url = "grailed.com" + item.find('a')['href']
        except TypeError:
            # Empty item
            continue

        # Check if the item already exists in db
        c.execute("SELECT * FROM sneakers WHERE url = ?;", (url,))
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db
            data = item_info(item)

            c.execute("""INSERT INTO sneakers (url,brand,model,size,current_price,old_price,image) 
                VALUES (?,?,?,?,?,?,?)""", (url, data["brand"], data["model"], data["size"], data["price"],
                                            data["old_price"], data["img"]))
            conn.commit()
            print("added new item")
        else:  # Item is already in db
            # TODO: check if prices have changed
            
            # Check if the item contains an image url
            try:
                item_img = item.find('img')['src']
                c.execute("SELECT image FROM sneakers WHERE url = ?;", (url,))
                db_img = c.fetchone()[0][0:4]
                if (db_img == 'N/A'):
                    c.execute("UPDATE sneakers SET image = ? WHERE url = ?;", (item_img, url))
                    conn.commit()
            except TypeError:
                # No image found for this item
                pass
        
    conn.commit()


def close_popup():
    """ Closes the login popup."""
    time.sleep(1) # Wait for the app element to load
    driver.find_element_by_id("app").click()
    popup_close = WebDriverWait(driver, 10).until(ec.visibility_of_element_located((By.CLASS_NAME, 'close'))) 
    actions.double_click(popup_close).perform()
    time.sleep(1)


def scroll_to_bottom(page_scrolls):
    """ Scrolls to the bottom of the web page.

    Arguments
        (int) page_scrolls: The number of scrolls necessary to reach the bottom of the page.

    Returns:
        No return value.
    """
    
    i = 0
    while i < page_scrolls:
        # Scroll incrementally to the bottom of the page
        driver.find_element_by_tag_name('body').send_keys(Keys.PAGE_DOWN)

        # Wait for items to load
        time.sleep(0.5)

        i += 1

        # TODO: Break the loop automatically when reached the bottom of the page


def run_scraper():
    """ Runs the Grailed Scraper.

    Returns:
        No return value.
    """

    close_popup()

    scroll_to_bottom(1500)

    # Get page html to scrape with bs4
    page_html = driver.page_source
    soup = BeautifulSoup(page_html, "lxml")
            
    # Get all the feed items and store in list
    feed = soup.find_all('div', {'class': 'feed-item'})
    
    # Insert items into the database
    insert_items(feed)


create_db_table()
run_scraper()


driver.quit()
conn.close()
