import requests
from urllib.parse import urlencode
import mysql.connector
from mysql.connector import ProgrammingError


# Setup connection to database
host = "test-database-1.cmamugrum56i.us-west-2.rds.amazonaws.com"
user = "admin"
passwd = "password"
db_name = "sneakers"
try:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
    c = conn.cursor()
    c.execute("USE sneakers;")
except ProgrammingError:
    print("couldn't connect to database")


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    try:
        c.execute("""CREATE TABLE goat_sneakers (
            id VARCHAR(10) PRIMARY KEY,
            source VARCHAR(50),
            model TEXT,
            size FLOAT,
            category TEXT,
            nickname TEXT,
            shoe_condition TEXT,
            price INT,
            price_cad INT,
            trending BOOLEAN,
            just_dropped BOOLEAN,
            url TEXT,
            image TEXT
        );""")
        conn.commit()

        c.execute("ALTER TABLE goat_sneakers ADD INDEX id (id);")
        c.execute("ALTER TABLE goat_sneakers ADD FULLTEXT model (model);")
        conn.commit()
    except ProgrammingError:
        pass


def get_api_data():
    """ Returns a very detailed list of items from Goat.

    Returns:
        List[Dict] items: A list containing dictionaries, each dictionary contains information on one pair of shoes.
    """

    url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
    params = {
        "x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
        "x-algolia-application-id": "2FWOTDVM2O",
        "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
    }

    items = []
    sizes = ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15','16']
    for size in sizes:
        post_json = {
            "params": "query=&" + urlencode({
                "distinct": "true",
                "query": "Air Jordan",
                "facetFilters": "(product_category: shoes), (presentation_size:"+size+"), (single_gender: men)",
                "offset": "0",
                "length": "1000"
            })
        }
        response = requests.post(url, params=params, json=post_json)
        resp_json = response.json()

        hits = resp_json['hits']
        for hit in hits:
            item = {
                'id': hit['objectID'],
                'source': "Goat",
                'model': hit['name'],
                'size': float(size),
                'category': hit['silhouette'],
                'nickname': hit['nickname'],
                'shoe_condition': hit['shoe_condition'],
                'lowest_price_usd': hit['lowest_price_cents']/100,
                'lowest_price_cad': hit['lowest_price_cents_cad']/100,
                'trending': 1 if 'trending' in hit['collection_slugs'] else 0,
                'just_dropped': 1 if 'just-dropped' in hit['collection_slugs'] else 0,
                'url': 'https://www.goat.com/sneakers/' + hit['slug'],
                'image': hit['main_picture_url'] 
            }
            items.append(item)

    return items


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
        data_list.append((item["id"], item["source"], item["model"], item["size"], item["category"], 
            item["nickname"], item["shoe_condition"], item["lowest_price_usd"], item["lowest_price_cad"],
            item['trending'], item['just_dropped'], item["url"], item["image"]))

    try:
        c.executemany("""INSERT IGNORE INTO goat_sneakers 
            (id,source,model,size,category,nickname,shoe_condition,
            price,price_cad,trending,just_dropped,url,image) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
        conn.commit()
    except ProgrammingError:
        pass


def run_scraper():
    """ Runs the scraper """

    # Get a list of all the item data from the api
    data = get_api_data()

    # Insert items into the database
    insert_items(data)


create_db_table()
run_scraper()

conn.close()