import time
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
import re
import sqlite3
from sqlite3 import OperationalError, IntegrityError

# Setup webdriver
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.flightclub.com/air-jordans')


# Setup connection to database
conn = sqlite3.connect("sneakers.db")
c = conn.cursor()


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    try:
        c.execute("""CREATE TABLE flightclub_sneakers (
            url TEXT primary key,
            brand TEXT,
            model TEXT,
            price INT,
            size FLOAT,
            image TEXT,
            source VARCHAR(20)
        )""")
        conn.commit()

        c.execute("""CREATE INDEX url ON flightclub_sneakers (url);""")
        conn.commit()
    except OperationalError:
        pass


def get_item_info(item, size):
    info = {'url': 'https://www.flightclub.com' + item['href'],
            'brand': 'Air Jordan', 
            'model': item.find('h2').text,
            'price': int(re.search(r'\d+', item.find('div', {'class': 'yszfz8-5 kbsRqK'}).text).group()),
            'size': float(size),
            'img': item.find('img')['src'],
            'source': 'Flight Club'}
    return info


def insert_items(feed, size):
    for item in feed:
        item_url = 'https://www.flightclub.com' + item['href']
        # Check if the item already exists in db
        c.execute("SELECT * FROM flightclub_sneakers WHERE url = ?;", (item_url,))
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db, insert
            data = get_item_info(item, size)

            c.execute("""INSERT INTO flightclub_sneakers
                (url,brand,model,price,size,image,source)
                VALUES (?,?,?,?,?,?,?);""",  (data["url"], data["brand"], data["model"],
                                              data["price"], data["size"],
                                              data["img"], data["source"]))
            conn.commit()
        else:  # Item is already in db
            # TODO: check if prices have changed
            pass

    conn.commit()


def run_scraper():
    sizes = driver.find_element_by_css_selector('div.u0zz5n-0:nth-child(4) > div:nth-child(2) > div:nth-child(1)').text.split('\n')
    for size in sizes:
        driver.get('https://www.flightclub.com/air-jordans?size_men=' + size)
        time.sleep(2.0)
        soup = BeautifulSoup(driver.page_source, "lxml")
        num_shoes = int(soup.find('span', {'class': 'kw3ij0-1 teOWb'}).text)
        num_scraped = 0
        next_btn = driver.find_element_by_css_selector('.dIgQsa')
        while num_scraped <= num_shoes:
            print(num_shoes, num_scraped)
            feed = soup.find_all('a', {'class': 'sc-12adlsx-0 iSXeRZ'})
            insert_items(feed[1:], size)
            num_scraped += len(feed[1:])
            next_btn.click()
            soup = BeautifulSoup(driver.page_source, "lxml")


create_db_table()
run_scraper()

conn.close()
