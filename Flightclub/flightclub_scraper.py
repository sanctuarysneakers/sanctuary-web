import time
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import re
import mysql.connector
from mysql.connector import ProgrammingError


# Setup webdriver
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.flightclub.com/air-jordans')


# Setup connection to database
host = "test-database-1.cmamugrum56i.us-west-2.rds.amazonaws.com"
user = "admin"
passwd = "password"
db_name = "sneakers"
try:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
    c = conn.cursor(buffered=True)
except ProgrammingError:
    print("couldn't connect to database")
c.execute("USE sneakers;")


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    try:
        c.execute("""CREATE TABLE flightclub_sneakers (
            id INT PRIMARY KEY,
            source VARCHAR(50),
            model TEXT,
            sku_id VARCHAR(20),
            brand TEXT,
            price INT,
            size FLOAT,
            url TEXT,
            image TEXT
        );""")
        conn.commit()

        c.execute("ALTER TABLE stockx_sneakers ADD INDEX id (id);")
        c.execute("ALTER TABLE flightclub_sneakers ADD FULLTEXT model_idx (model);")
        conn.commit()
    except ProgrammingError:
        pass


def get_item_info(item, size):
    model_name = item.find('h2').text.replace('…','')
    c.execute("SELECT sku_id FROM goat_sneakers WHERE model LIKE %s;", ('%'+model_name+'%',))
    try:
        sku_id = c.fetchone()[0]
    except TypeError:
        sku_id = None
    
    info = {'id': abs(hash(item['href']+'-'+str(size))) % (10**7),
            'source': 'Flight Club',
            'url': 'https://www.flightclub.com' + item['href'],
            'brand': 'Air Jordan', 
            'model': model_name,
            'sku_id': sku_id,
            'price': int(re.search(r'\d+', item.find('div', {'class': 'yszfz8-5 kbsRqK'}).text).group()),
            'size': float(size),
            'img': item.find('img')['src']}
    return info


def insert_items(feed, size):
    data_list = []
    for item in feed:
        data = get_item_info(item, size)
        if "wmns" in data["model"].lower():
            continue
        data_list.append((data["id"],data["source"],data["model"],data["sku_id"],
            data["brand"],data["price"],data["size"],data["url"],data["img"]))

    try:
        c.executemany("""INSERT IGNORE INTO flightclub_sneakers
            (id,source,model,sku_id,brand,price,size,url,image)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
        conn.commit()
    except ProgrammingError:
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
        
        items = []
        num_shoes = int(soup.find('span', {'class': 'kw3ij0-1 teOWb'}).text)
        num_scraped = 0
        next_btn = driver.find_element_by_css_selector('.dIgQsa')
        while num_scraped <= num_shoes:
            print(size, num_shoes, num_scraped)
            items.extend(soup.find_all('a', {'class': 'sc-12adlsx-0 iSXeRZ'})[1:])
            num_scraped = len(items[1:])
            next_btn.click()
            soup = BeautifulSoup(driver.page_source, "lxml")

        insert_items(items, size)


create_db_table()
run_scraper()

driver.close()
conn.close()