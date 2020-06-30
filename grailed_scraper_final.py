from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
import pandas as pd
import sqlite3
from sqlite3 import OperationalError
from sqlite3 import IntegrityError

# Setup chromedriver
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
    ''' Scrolls to the bottom of the page to load all the feed items '''

    SCROLL_PAUSE_TIME = 0.5

    # Get scroll height
    last_height = driver.execute_script("return document.body.scrollHeight")
    
    # Amount of scrolls to the bottom of page
    i = 0
    while (i < page_scrolls):
        # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if (new_height == last_height):
            break
        last_height = new_height

        i += 1

def item_info(item):
    ''' Scrapes information about each item, and returns as a dictionary '''
    
    info = {}

    # Get brand
    info["brand"] = item.find_element_by_xpath(".//p[@class='listing-designer truncate']").text
    
    # Get model (name)
    info["model"] = item.find_element_by_xpath(".//p[@class='truncate listing-title']").text
    
    # Get size
    info["size"] = float(item.find_element_by_xpath('.//p[@class="listing-size sub-title"]').text)

    # Get current price and old price
    try:
        price = float(item.find_element_by_xpath('.//p[@class="sub-title original-price"]').text[1:].replace(',', ''))
        old_price = None
    except NoSuchElementException:
        price = float(item.find_element_by_xpath('.//p[@class="sub-title new-price"]').text[1:].replace(',', ''))
        old_price = float(item.find_element_by_xpath('.//p[@class="sub-title original-price strike-through"]').text[1:].replace(',', ''))
    info["price"] = price
    info["old_price"] = old_price

    # Get image (doesn't work for all)
    try:
        img = item.find_element_by_xpath(".//div[@class='listing-cover-photo ']/img").get_attribute("src")
    except NoSuchElementException:
        img = "N/A"
    info["img"] = img

    return info

def insert_items(feed):
    ''' Loops through all items in the feed and inserts them into the db
    if they don't already exist. If a certain item already exists in the db,
    it updates price if it has changed. '''
    
    for item in feed:
        # Get link (PRIMARY KEY)
        url = item.find_element_by_xpath('./a').get_attribute("href")

        # Check if the item already exists in db
        c.execute("SELECT * FROM sneakers WHERE url = ?;", (url,))
        conn.commit()
        result = c.fetchall()

        if (len(result) == 0):  # Item isnt't already in db
            data = item_info(item)

            c.execute("""INSERT INTO sneakers (url,brand,model,size,current_price,old_price,image) 
                VALUES (?,?,?,?,?,?,?)""", (url, data["brand"], data["model"], data["size"], data["price"], data["old_price"], data["img"]))
        else:
            ### TODO: check if prices have changed
            pass
        
    conn.commit()

def run_scraper(page_scrolls):

    # Scroll to the bottom of page N times
    scroll_to_bottom(page_scrolls)
    
    # Get all the feed items and store in list
    feed = driver.find_elements_by_xpath("//div[@class='feed-item']")
    
    # Insert items into db if they don't already exist
    insert_items(feed)


create_db_table()
run_scraper(10)


driver.quit()
conn.close()
