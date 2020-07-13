import requests
from urllib.parse import urlencode
import sqlite3
from sqlite3 import OperationalError, IntegrityError

# Setup connection to database
conn = sqlite3.connect("sneakers.db")
c = conn.cursor()


def create_db_table():
    """ Creates an empty database table with the necessary keys."""
    try:
        c.execute("""CREATE TABLE stockx_sneakers (
            id VARCHAR(30) primary key,
            model TEXT,
            size FLOAT,
            category TEXT,
            retail_price INT,
            price_premium INT,
            lowest_ask_price INT,
            highest_bid INT,
            annual_high_price INT,
            annual_low_price INT,
            average_price INT,
            average_price_rank INT,
            volatility FLOAT, 
            number_of_asks INT,
            number_of_bids INT,
            annual_sold INT,
            url TEXT,
            image TEXT
        )""")
        conn.commit()

        c.execute("""CREATE INDEX id ON stockx_sneakers (id);""")
        conn.commit()
    except OperationalError:
        pass


def get_api_data():
    """ Returns a very detailed list of items from Stockx.

    Returns:
        List[Dict] results: A list containing dictionaries, each dictionary contains information on one pair of shoes.
    """

    url = "https://stockx.com/api/browse"
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
    
    items = []
    page = 1
    while page <= 25:
        parameters = {
            "_tags": "air jordan",
            "productCategory": "sneakers",
            "shoeSize": "12",
            "sort": "deadstock_sold",
            "order": "DESC",
            "page": str(page)
        }
        response = requests.get(url, headers=headers, params=parameters)
        feed = response.json()["Products"]
        for item in feed:
            item_data = {
                "id": item["tickerSymbol"],
                "model": item["title"],
                "size": item["shoeSize"],
                "category": item["category"],
                "retailPrice": item["retailPrice"],
                "pricePremium": item["market"]["pricePremium"],
                "lowestAsk": item["market"]["lowestAsk"],
                "highestBid": item["market"]["highestBid"],
                "annualHigh": item["market"]["annualHigh"],
                "annualLow": item["market"]["annualLow"],
                "averagePrice": item["market"]["averageDeadstockPrice"],
                "averagePriceRank": item["market"]["averageDeadstockPriceRank"],
                "volatility": item["market"]["volatility"],
                "numberOfAsks": item["market"]["numberOfAsks"],
                "numberOfBids": item["market"]["numberOfBids"],
                "annualSold": item["market"]["deadstockSold"],
                "url": "stockx.com/" + item["urlKey"],
                "image": item["media"]["imageUrl"]
            }
            items.append(item_data)
        
        page += 1

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

    for item in item_data:
        # Check if the item already exists in db
        c.execute("SELECT * FROM stockx_sneakers WHERE id = ?;", (item['id'],))
        result = c.fetchall()

        if len(result) == 0:  # Item isnt't already in db, insert
            c.execute("""INSERT INTO stockx_sneakers 
                (id,model,size,category,retail_price,price_premium,
                lowest_ask_price,highest_bid,annual_high_price,annual_low_price,
                average_price,average_price_rank,volatility,number_of_asks,
                number_of_bids,annual_sold,url,image) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);""",  (item["id"], item["model"], item["size"],
                                                                    item["category"], item["retailPrice"], 
                                                                    item["pricePremium"],item["lowestAsk"],
                                                                    item["highestBid"],item["annualHigh"],
                                                                    item["annualLow"],item["averagePrice"],
                                                                    item["averagePriceRank"],item["volatility"],
                                                                    item["numberOfAsks"],item["numberOfBids"],
                                                                    item["annualSold"], item["url"],
                                                                    item["image"]))
            conn.commit()
        else:  # Item is already in db
            # TODO: check if prices have changed
            pass

    conn.commit()


def run_scraper():
    """ Runs the Stockx Scraper.

    Returns:
        No return value.
    """
    
    # Get a list of all the item data from the api
    data = get_api_data()

    # Insert items into the database
    insert_items(data)


create_db_table()
run_scraper()

conn.close()
