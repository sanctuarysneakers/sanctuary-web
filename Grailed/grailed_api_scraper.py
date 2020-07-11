import requests
from urllib.parse import urlencode
import re
import sqlite3
from sqlite3 import OperationalError, IntegrityError

# Setup connection to database
conn = sqlite3.connect("sneakers.db")
c = conn.cursor()


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    try:
        c.execute("""CREATE TABLE grailed_sneakers (
            id CHAR(8) primary key,
            url VARCHAR(30),
            brand VARCHAR(200),
            model TEXT,
            size FLOAT,
            current_price INT,
            old_price INT,
            image TEXT,
            date_bumped VARCHAR(10),
            date_created VARCHAR(10),
            heat INT,
            condition VARCHAR(50),
            seller_location VARCHAR(30),
            seller_rating FLOAT, 
            seller_rating_count INT,
            shipping_us INT,
            shipping_ca INT,
            shipping_uk INT,
            shipping_eu INT,
            shipping_asia INT,
            shipping_au INT,
            shipping_other INT
        )""")
        conn.commit()

        c.execute("""CREATE INDEX id ON grailed_sneakers (id);""")
        conn.commit()
    except OperationalError:
        pass


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
            item_data = {"id": str(item['id']),
                         "url": "grailed.com/listings/" + str(item['id']),
                         "brand": item['designer_names'],
                         "model": item['title'],
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
                         "shipping_asia": item['shipping']['asia']['amount'] if item['shipping']['asia'][
                             'enabled'] else None,
                         "shipping_au": item['shipping']['au']['amount'] if item['shipping']['au']['enabled'] else None,
                         "shipping_other": item['shipping']['other']['amount'] if item['shipping']['other'][
                             'enabled'] else None
                         }
            results.append(item_data)

        offset += 1000

    return results


def insert_items(api_data):
    """ Inserts feed items into db.

    Loops through all items in the feed and inserts them into the db
    if they don't already exist. If a certain item already exists in the db,
    it updates information if it has changed.

    Arguments:
        (Dict) api_data: A list containing data for each feed item.

    Returns:
        No return value.
    """

    for item in api_data:
        # Check if the item already exists in db
        c.execute("SELECT * FROM grailed_sneakers WHERE id = ?;", (item['id'],))
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db, insert
            c.execute("""INSERT INTO grailed_sneakers 
                (id,url,brand,model,size,current_price,old_price,
                image,date_bumped,date_created,heat,condition,seller_location,
                seller_rating,seller_rating_count,shipping_us,shipping_ca,shipping_uk,
                shipping_eu,shipping_asia,shipping_au,shipping_other) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);""", (item["id"], item["url"], item["brand"],
                                                                           item["model"], item["size"], item["price"],
                                                                           item["old_price"], item["img"],
                                                                           item["date_bumped"], item["date_created"],
                                                                           item["heat"], item["condition"],
                                                                           item["seller_location"],
                                                                           item["seller_rating"],
                                                                           item["seller_rating_count"],
                                                                           item["shipping_us"], item["shipping_ca"],
                                                                           item["shipping_uk"],
                                                                           item["shipping_eu"], item["shipping_asia"],
                                                                           item["shipping_au"], item["shipping_other"]))
            conn.commit()
        else:  # Item is already in db
            # TODO: check if prices have changed
            pass

    conn.commit()


def run_scraper():
    """ Runs the Grailed Scraper.

    Returns:
        No return value.
    """

    # Get a list of all the item data from the internal grailed api
    api_data = get_api_data()

    # Insert items into the database
    insert_items(api_data)


create_db_table()
run_scraper()

conn.close()
