import requests
import time
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
    c.execute("DROP TABLE IF EXISTS stockx_sneakers_tmp;")
    try:
        c.execute("""CREATE TABLE stockx_sneakers_tmp (
            id INT PRIMARY KEY,
            source VARCHAR(50),
            model TEXT,
            sku_id VARCHAR(20),
            size FLOAT,
            price INT,
            shoe_condition VARCHAR(30),
            category TEXT,
            recently_sold INT,
            annual_sold INT,
            retail_price INT,
            highest_bid INT,
            annual_high_price INT,
            annual_low_price INT,
            average_price INT,
            volatility FLOAT, 
            number_of_asks INT,
            number_of_bids INT,
            url TEXT,
            image TEXT
        );""")
        conn.commit()
    except ProgrammingError:
        pass


def alter_db_table():
    c.execute("ALTER TABLE stockx_sneakers_tmp ADD INDEX id (id);")
    c.execute("ALTER TABLE stockx_sneakers_tmp ADD FULLTEXT model_idx (model);")

    c.execute("RENAME TABLE stockx_sneakers TO stockx_sneakers_old, stockx_sneakers_tmp TO stockx_sneakers;")
    c.execute("DROP TABLE stockx_sneakers_old;")

    conn.commit()


def get_api_data(start_size, end_size):
    """ Returns a very detailed list of items from Stockx.

    Returns:
        List[Dict] items: A list containing dictionaries, each dictionary contains information on one pair of shoes.
    """

    url = "https://stockx.com/api/browse"
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
        "referer": "https://stockx.com/retro-jordans",
        "accept": "*/*",
        "appos": "web",
        "appversion": "0.1"
    }

    items = []
    size = start_size
    while size <= end_size:
        page = 1
        while page <= 20:
            parameters = {
                "_tags": "air jordan",
                "productCategory": "sneakers",
                "shoeSize": ('%.2f' % (size,)).rstrip('0').rstrip('.'),
                "page": str(page)
            }
            response = requests.get(url, headers=headers, params=parameters)
            if not response.ok:
                print(response)
                return items
            
            print("scraping page " + str(page) + " of size " + str(size) + " sneakers")
            feed = response.json()["Products"]
            for item in feed:
                if item["market"]["lowestAsk"] == 0 or item["market"]["lowestAsk"] == None:
                    continue
                item_data = {
                    "id": abs(hash(item["objectID"]) % (10**7)),
                    "source": "StockX",
                    "model": item["title"],
                    "skuId": item["styleId"],
                    "size": item["shoeSize"],
                    "condition": item["condition"],
                    "category": item["category"],
                    "price": item["market"]["lowestAsk"],
                    "retailPrice": item["retailPrice"],
                    "highestBid": item["market"]["highestBid"],
                    "annualHigh": item["market"]["annualHigh"],
                    "annualLow": item["market"]["annualLow"],
                    "averagePrice": item["market"]["averageDeadstockPrice"],
                    "volatility": item["market"]["volatility"],
                    "numberOfAsks": item["market"]["numberOfAsks"],
                    "numberOfBids": item["market"]["numberOfBids"],
                    "annualSold": item["market"]["deadstockSold"],
                    "recentSold": item["market"]["salesLast72Hours"],
                    "url": "stockx.com/" + item["urlKey"],
                    "image": item["media"]["imageUrl"]
                }
                items.append(item_data)
            
            page += 1
            time.sleep(2)
        
        size += 0.5
        time.sleep(4)

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
        data_list.append((item["id"],item["source"],item["model"],item["skuId"],item["size"],item["price"],
            item["condition"],item["category"],item["recentSold"],item["annualSold"],item["retailPrice"],
            item["highestBid"],item["annualHigh"],item["annualLow"],item["averagePrice"],item["volatility"], 
            item["numberOfAsks"], item["numberOfBids"], item["url"], item["image"]))
    
    try:
        c.executemany("""INSERT IGNORE INTO stockx_sneakers_tmp
            (id,source,model,sku_id,size,price,shoe_condition,category,
            recently_sold,annual_sold,retail_price,highest_bid,
            annual_high_price,annual_low_price,average_price,
            volatility,number_of_asks,number_of_bids,url,image) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
        conn.commit()
    except ProgrammingError:
        pass

    conn.commit()


def run_scraper(start_size, end_size):
    """ Runs the Stockx Scraper.

    Returns:
        No return value.
    """
    
    # Get a list of all the item data from the api within a shoe size range
    data = get_api_data(start_size, end_size)

    # Insert items into the database
    insert_items(data)


create_db_table()

run_scraper(6, 9)        # Interval 1
time.sleep(1000)
run_scraper(9.5, 12.5)   # Interval 2
time.sleep(1500)
run_scraper(13, 15)      # Interval 3

alter_db_table()


conn.close()