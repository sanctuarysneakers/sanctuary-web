from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as ec
import time
import pandas as pd
import sqlite3
from sqlite3 import OperationalError, IntegrityError

# Setup webdriver
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')

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


def scroll_to_bottom(page_scrolls):
    """Scrolls to the bottom of the page to load all the feed items.

    Arguments:
        (int) page_scrolls: The number of page scrolls to execute.

    Returns:
        No return value.
    """

    # Wait until login window pops up and manually close
    time.sleep(7)
    popup_close = WebDriverWait(driver, 10).until(ec.visibility_of_element_located((By.CLASS_NAME, 'close')))
    actionChains = ActionChains(driver)
    actionChains.double_click(popup_close).perform()
    SCROLL_PAUSE_TIME = 1.0
    
    # Amount of scrolls to the bottom of page
    i = 0

    while i < page_scrolls:
        # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)

        i += 1
        print("Scroll:", i)


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
    except NoSuchElementException:
        price = float(item.find('p', {'class':'sub-title new-price'}).text[1:].replace(',', ''))
        old_price = float(item.find('p', {'class':'sub-title original-price strike-through'}).text[1:].replace(',', ''))
    info["price"] = price
    info["old_price"] = old_price

    try:
        img = item.find('img')['srcset']
    except NoSuchElementException:
        img = "N/A"
        print(item)
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
        except NoSuchElementException:
            # Empty item
            continue

        # Check if the item already exists in db
        c.execute("SELECT * FROM sneakers WHERE url = ?;", (url,))
        conn.commit()
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db
            data = item_info(item)

            c.execute("""INSERT INTO sneakers (url,brand,model,size,current_price,old_price,image) 
                VALUES (?,?,?,?,?,?,?)""", (url, data["brand"], data["model"], data["size"], data["price"],
                                            data["old_price"], data["img"]))
            print("added new item")
        else:
            # TODO: check if prices have changed
            print("item already in db")
        
    conn.commit()


def run_scraper(page_scrolls):
    """ Runs the Grailed Scraper.

    Arguments:
        (int) page_scrolls: The number of scrolls necessary to reach the bottom of the page.

    Returns:
        No return value.
    """
    # Scroll to the bottom of page page_scroll times
    scroll_to_bottom(page_scrolls)

    # Get page html to scrape with bs4
    page_html = driver.page_source
    soup = BeautifulSoup(page_html, "lxml")
    
    # Get all the feed items and store in list
    feed = soup.find_all('div', {'class':'feed-item'})
    
    # Insert items into db if they don't already exist
    insert_items(feed)


create_db_table()
run_scraper(300)


driver.quit()
conn.close()
