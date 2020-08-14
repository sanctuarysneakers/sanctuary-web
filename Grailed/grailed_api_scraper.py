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
    c.execute("DROP TABLE IF EXISTS grailed_sneakers_tmp;")
    try:
        c.execute("""CREATE TABLE grailed_sneakers_tmp (
            id INT PRIMARY KEY,
            source VARCHAR(50),
            model TEXT,
            sku_id VARCHAR(20),
            size FLOAT,
            price INT,
            shoe_condition VARCHAR(30),
            category TEXT,
            old_price INT,
            date_bumped VARCHAR(10),
            date_created VARCHAR(10),
            heat INT,
            seller_location VARCHAR(30),
            seller_rating FLOAT, 
            seller_rating_count INT,
            shipping_us INT,
            shipping_ca INT,
            shipping_uk INT,
            shipping_eu INT,
            shipping_asia INT,
            shipping_au INT,
            shipping_other INT,
            url TEXT,
            image TEXT
        );""")
        conn.commit()
    except ProgrammingError:
        pass


def alter_db_table():
    c.execute("ALTER TABLE grailed_sneakers_tmp ADD INDEX id (id);")
    c.execute("ALTER TABLE grailed_sneakers_tmp ADD FULLTEXT model_idx (model);")

    c.execute("RENAME TABLE grailed_sneakers TO grailed_sneakers_old, grailed_sneakers_tmp TO grailed_sneakers;")
    c.execute("DROP TABLE grailed_sneakers_old;")

    conn.commit()


def get_api_data():
    """ Returns a very detailed list of items on Grailed.

    Returns:
        List[Dict] results: A list containing dictionaries, each dictionary contains information on one pair of shoes.
    """

    url = "https://mnrwefss2q-1.algolianet.com/1/indexes/Listing_production/browse"
    params = {
        "x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
        "x-algolia-application-id": "MNRWEFSS2Q",
        "x-algolia-api-key": "a1c6338ffe41249d0284a5a1105eafe4"
    }

    results = []

    offset = 0
    while offset <= 10000:
        post_json = {
            "params": "query=&" + urlencode({
                "offset": str(offset),
                "length": "1000",
                "facetFilters": "[[\"category_path:footwear.hitop_sneakers\"], [\"designers.name:Jordan Brand\"]]",
                "filters": ""
            })
        }
        response = requests.post(url, params=params, json=post_json)
        response.raise_for_status()
        items = response.json()["hits"]

        for item in items:
            item_data = {
                "id": int(item['id']),
                "source": "Grailed",
                "url": "grailed.com/listings/" + str(item['id']),
                "category": item['designer_names'],
                "model": item['title'],
                "sku_id": None if item['sku_id'] is None else str(item['sku_id']),
                "size": float(item['size']),
                "price": str(item['price']),
                "old_price": item['price_drops'][-2] if len(item['price_drops']) > 1 else None,
                "img": item['cover_photo']['url'],
                "date_bumped": item['bumped_at'][:10],
                "date_created": item['cover_photo']['created_at'][:10],
                "heat": item['heat'],
                "condition": item['condition'],
                "seller_location": item['location'],
                "seller_rating": round(item['user']['seller_score']['rating_average'], 1) if
                    item['user']['seller_score']['rating_average'] else None,
                "seller_rating_count": item['user']['seller_score']['rating_count'],
                "shipping_us": item['shipping']['us']['amount'] if item['shipping']['us']['enabled'] else None,
                "shipping_ca": item['shipping']['ca']['amount'] if item['shipping']['ca']['enabled'] else None,
                "shipping_uk": item['shipping']['uk']['amount'] if item['shipping']['uk']['enabled'] else None,
                "shipping_eu": item['shipping']['eu']['amount'] if item['shipping']['eu']['enabled'] else None,
                "shipping_asia": item['shipping']['asia']['amount'] if item['shipping']['asia']['enabled'] else None,
                "shipping_au": item['shipping']['au']['amount'] if item['shipping']['au']['enabled'] else None,
                "shipping_other": item['shipping']['other']['amount'] if item['shipping']['other']['enabled'] else None
            }
            results.append(item_data)

        offset += 1000

    return results


def insert_items(item_data):
    """ Inserts feed items into db.

    Loops through all items in the feed and inserts them into the db
    if they don't already exist. If a certain item already exists in the db,
    it updates information if it has changed.

    Arguments:
        (Dict) item_data: A list containing data for each feed item.

    Returns:
        No return value.
    """

    data_list = []
    for item in item_data:
        data_list.append((item["id"], item["source"], item["model"], item["sku_id"], item["size"], 
            item["price"], item["condition"], item["category"], item["old_price"], 
            item["date_bumped"], item["date_created"], item["heat"],item["seller_location"], 
            item["seller_rating"], item["seller_rating_count"],item["shipping_us"], item["shipping_ca"], 
            item["shipping_uk"], item["shipping_eu"], item["shipping_asia"],item["shipping_au"], 
            item["shipping_other"], item["url"], item["img"]))
    
    try:
        c.executemany("""INSERT IGNORE INTO grailed_sneakers_tmp
            (id,source,model,sku_id,size,price,shoe_condition,category,old_price,
            date_bumped,date_created,heat,seller_location,
            seller_rating,seller_rating_count,shipping_us,shipping_ca,shipping_uk,
            shipping_eu,shipping_asia,shipping_au,shipping_other,url,image) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
        conn.commit()
    except ProgrammingError:
        pass

    conn.commit()


def run_scraper():
    """ Runs the Grailed Scraper.

    Returns:
        No return value.
    """

    # Get a list of all the item data from the api
    item_data = get_api_data()

    # Insert items into the database
    insert_items(item_data)


create_db_table()
run_scraper()
alter_db_table()

conn.close()