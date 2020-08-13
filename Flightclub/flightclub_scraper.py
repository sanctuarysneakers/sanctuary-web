import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import re
import mysql.connector
from mysql.connector import ProgrammingError


# Setup webdriver & options
options = Options()
options.add_argument('--no-sandbox')
options.add_argument("--headless")
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
driver.get('https://www.flightclub.com/air-jordans')


# Setup connection to database
host = "mysql-db-master.cmamugrum56i.us-west-2.rds.amazonaws.com"
user = "admin"
passwd = "4tDqfnvbQ8R8RGuh"
db_name = "sneakers"
try:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
    c = conn.cursor(buffered=True)
    c.execute("USE sneakers;")
except ProgrammingError:
    print("couldn't connect to database")


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    c.execute("DROP TABLE IF EXISTS flightclub_sneakers_tmp;")
    try:
        c.execute("""CREATE TABLE flightclub_sneakers_tmp (
            id INT PRIMARY KEY,
            source VARCHAR(50),
            model TEXT,
            sku_id VARCHAR(20),
            size FLOAT,
            price INT,
            category TEXT,
            shoe_condition VARCHAR(30),
            url TEXT,
            image TEXT
        );""")
        conn.commit()
    except ProgrammingError:
        pass


def alter_db_table():
    c.execute("ALTER TABLE flightclub_sneakers_tmp ADD INDEX id (id);")
    c.execute("ALTER TABLE flightclub_sneakers_tmp ADD FULLTEXT model_idx (model);")

    c.execute("RENAME TABLE flightclub_sneakers TO flightclub_sneakers_old, flightclub_sneakers_tmp TO flightclub_sneakers;")
    c.execute("DROP TABLE flightclub_sneakers_old;")

    conn.commit()


def get_item_info(item, size):
    model_name = item.find('h2').text.replace('…','')
    c.execute("SELECT sku_id FROM goat_sneakers WHERE model LIKE %s;", ('%'+model_name+'%',))
    try:
        sku_id = c.fetchone()[0]
    except TypeError:
        sku_id = None
    
    info = {
        'id': abs(hash(item['href']+'-'+str(size))) % (10**7),
        'source': 'Flight Club',
        'url': 'https://www.flightclub.com' + item['href'],
        'category': 'Air Jordan', 
        'model': model_name,
        'sku_id': sku_id,
        'price': int(re.search(r'\d+', item.find('div', {'class': 'yszfz8-5 kbsRqK'}).text).group()),
        'condition': 'New',
        'size': float(size),
        'img': item.find('img')['src']
    }
    return info


def insert_items(feed, size):
    data_list = []
    for item in feed:
        data = get_item_info(item, size)
        if "wmns" in data["model"].lower():
            continue
        data_list.append((data["id"],data["source"],data["model"],data["sku_id"],
            data["size"],data["price"],data["category"],data["condition"],data["url"],data["img"]))

    try:
        c.executemany("""INSERT IGNORE INTO flightclub_sneakers_tmp
            (id,source,model,sku_id,size,price,category,shoe_condition,url,image)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
        conn.commit()
    except ProgrammingError:
        pass

    conn.commit()


def run_scraper():
    sizes = [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,15,16]
    for size in sizes:
        driver.get('https://www.flightclub.com/air-jordans?size_men=' + str(size))
        time.sleep(5)
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
alter_db_table()

driver.close()
conn.close()