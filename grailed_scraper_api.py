import requests
from urllib.parse import urlencode
import re
import sqlite3
from sqlite3 import OperationalError, IntegrityError


# Setup connection to database
conn = sqlite3.connect("sneakers.db")
c = conn.cursor()

def create_db_table():
    try:
        c.execute("""CREATE TABLE sneakers (
            id text primary key,
            url text,
            brand text,
            model text,
            size real,
            current_price real,
            old_price real,
            image text,
            date_bumped text,
            date_created text,
            seller_location text
        )""")
        conn.commit()

        c.execute("""CREATE INDEX id ON sneakers (id);""")
        conn.commit()
    except OperationalError:
        pass


def get_api_data():
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
                "size": re.findall('\d+', item['category_size'])[0],
                "price": str(item['price']),
                "old_price": item['price_drops'][-2] if len(item['price_drops']) > 1 else None,
                "img": item['cover_photo']['url'],
                "date_bumped": item['bumped_at'][:10],
                "date_created": item['cover_photo']['created_at'][:10],
                "seller_location": item['location']
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
        c.execute("SELECT * FROM sneakers WHERE id = ?;", (item['id'],))
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db, insert
            c.execute("""INSERT INTO sneakers 
                (id,url,brand,model,size,current_price,old_price,
                image,date_bumped,date_created,seller_location) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?)""", (item["id"], item["url"], item["brand"], 
                item["model"], item["size"], item["price"], item["old_price"], item["img"], 
                item["date_bumped"], item["date_created"], item["seller_location"]))
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
