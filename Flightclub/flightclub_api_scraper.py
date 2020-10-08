import requests
from urllib.parse import urlencode
import mysql.connector
from mysql.connector import ProgrammingError


# Setup connection to database
host = "mysql-db-master.cmamugrum56i.us-west-2.rds.amazonaws.com"
user = "admin"
passwd = "4tDqfnvbQ8R8RGuh"
db_name = "sneakers"
try:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
    c = conn.cursor()
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
            trending BOOLEAN,
            top_seller BOOLEAN,
            new_release BOOLEAN,
            top_collab BOOLEAN,
            price_drop BOOLEAN,
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


def get_api_data(s_query):
    url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query"
    params = {
        "x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
        "x-algolia-application-id": "2FWOTDVM2O",
        "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
    }

    items = []
    sizes = ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15','16']
    for size in sizes:
        page = 0
        while True:  # loop through each page
            print(s_query + ": page " + str(page) + " of size " + size)
            post_json = {
                "params": "query=&" + urlencode({
                    "query": s_query,
                    "facetFilters": f'[["size_us_men:{size}"]]',
                    "distinct": "true",
                    "hitsPerPage": "50",
                    "page": f"{page}"
                })
            }

            response = requests.post(url, params=params, json=post_json)
            resp_json = response.json()

            hits = resp_json['hits']
            for hit in hits:
                item = {
                    'id': int(hit['objectID']),
                    'source': "Flight Club",
                    'model': hit['name'],
                    'sku_id': hit['sku'].replace(' ', '-'),
                    'size': hit['size'],
                    'price': hit['lowest_price_cents']/100,
                    'category': hit['silhouette'],
                    'shoe_condition': hit['shoe_condition'],
                    'trending': 1 if 'trending' in hit['collection_slugs'] else 0,
                    'top_seller': 1 if 'top-sellers' in hit['collection_slugs'] else 0,
                    'new_release': 1 if 'new-releases' in hit['collection_slugs'] else 0,
                    'top_collab': 1 if 'top-collaborations' in hit['collection_slugs'] else 0,
                    'price_drop': 1 if 'price-drops' in hit['collection_slugs'] else 0,
                    'url': 'https://www.flightclub.com/' + hit['slug'],
                    'image': hit['main_picture_url']
                }
                items.append(item)

            if len(hits) == 0:
                break
            page += 1

    return items


def insert_items(item_data):
    data_list = []
    for item in item_data:
        data_list.append((item['id'],item['source'],item['model'],item['sku_id'],item["size"],
            item['price'],item['category'],item['shoe_condition'],item['trending'],item['top_seller'],
            item['new_release'],item['top_collab'],item['price_drop'],item['url'],item['image']))
    
    try:
        c.executemany("""INSERT IGNORE INTO flightclub_sneakers_tmp
            (id,source,model,sku_id,size,price,category,shoe_condition,trending,top_seller,
            new_release,top_collab,price_drop,url,image) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
        conn.commit()
    except ProgrammingError:
        pass


def run_scraper():
    """ Runs the scraper """
    
    categoryList = ["Air Jordan","Nike Running","Air Force","Dunk","Yeezy","Ultraboost","Nike SB"]

    # Get a list of all the item data from the api
    data = []
    for category in categoryList:
        data.extend(get_api_data(category))
    print("Scraped:", len(data), "items.")

    # Insert items into the database
    insert_items(data)


create_db_table()
run_scraper()
alter_db_table()

conn.close()