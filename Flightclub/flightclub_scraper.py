import time
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
import re
import mysql.connector
from mysql.connector import ProgrammingError


# Setup webdriver
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.flightclub.com/air-jordans')


# Setup connection to database
host = "localhost"
user = "root"
passwd = "password"
try:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database="sneakers")
    c = conn.cursor()
except ProgrammingError:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd)
    c = conn.cursor()
    c.execute("CREATE DATABASE sneakers;")
    conn.commit()
c.execute("USE sneakers;")


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    try:
        c.execute("""CREATE TABLE flightclub_sneakers (
            id INT primary key,
            url TEXT,
            brand TEXT,
            model TEXT,
            price INT,
            size FLOAT,
            image TEXT
        );""")
        conn.commit()

        c.execute("ALTER TABLE flightclub_sneakers ADD FULLTEXT model (model);")
        conn.commit()
    except ProgrammingError:
        pass


def get_item_info(item, size):
    info = {'id': abs(hash(item['href']+'-'+str(size))) % (10**7),
            'url': 'https://www.flightclub.com' + item['href'],
            'brand': 'Air Jordan', 
            'model': item.find('h2').text.replace('…',''),
            'price': int(re.search(r'\d+', item.find('div', {'class': 'yszfz8-5 kbsRqK'}).text).group()),
            'size': float(size),
            'img': item.find('img')['src']}
    return info


def insert_items(feed, size):
    for item in feed:
        item_id = abs(hash(item['href']+'-'+str(size))) % (10**7)
        # Check if the item already exists in db
        c.execute("SELECT * FROM flightclub_sneakers WHERE id = %s;", (item_id,))
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db, insert
            data = get_item_info(item, size)

            c.execute("""INSERT INTO flightclub_sneakers
                (id,url,brand,model,price,size,image)
                VALUES (%s,%s,%s,%s,%s,%s,%s);""", 
                    (item_id, data["url"], data["brand"], data["model"], 
                    data["price"], data["size"], data["img"]))
            conn.commit()
        else:  # Item is already in db
            # TODO: check if prices have changed
            pass

    conn.commit()


def run_scraper():
    time.sleep(5)
    sizes = driver.find_element_by_css_selector(
        'div.u0zz5n-0:nth-child(4) > div:nth-child(2) > div:nth-child(1)').text.split('\n')
    for size in sizes:
        driver.get('https://www.flightclub.com/air-jordans?size_men=' + size)
        time.sleep(2.5)
        soup = BeautifulSoup(driver.page_source, "lxml")
        num_shoes = int(soup.find('span', {'class': 'kw3ij0-1 teOWb'}).text)
        num_scraped = 0
        next_btn = driver.find_element_by_css_selector('.dIgQsa')
        while num_scraped <= num_shoes:
            print(size, num_shoes, num_scraped)
            feed = soup.find_all('a', {'class': 'sc-12adlsx-0 iSXeRZ'})
            insert_items(feed[1:], size)
            num_scraped += len(feed[1:])
            next_btn.click()
            soup = BeautifulSoup(driver.page_source, "lxml")


create_db_table()
run_scraper()

driver.close()
conn.close()