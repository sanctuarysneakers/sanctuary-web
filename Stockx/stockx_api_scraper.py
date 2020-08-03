import requests
import api_auth
import time
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
        c.execute("""CREATE TABLE stockx_sneakers (
            id VARCHAR(200) primary key,
            source VARCHAR(50),
            model TEXT,
            sku_id VARCHAR(20),
            size FLOAT,
            category TEXT,
            retail_price INT,
            price INT,
            highest_bid INT,
            annual_high_price INT,
            annual_low_price INT,
            average_price INT,
            average_price_rank INT,
            volatility FLOAT, 
            number_of_asks INT,
            number_of_bids INT,
            annual_sold INT,
            recently_sold INT,
            url TEXT,
            image TEXT
        )""")
        conn.commit()

        c.execute("ALTER TABLE stockx_sneakers ADD INDEX id (id);")
        c.execute("ALTER TABLE stockx_sneakers ADD FULLTEXT model_idx (model);")
        conn.commit()
    except ProgrammingError:
        pass


def get_api_data(start_size, end_size):
    """ Returns a very detailed list of items from Stockx.

    Returns:
        List[Dict] items: A list containing dictionaries, each dictionary contains information on one pair of shoes.
    """

    url = "https://stockx.com/api/browse"
    headers = api_auth.headers

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
                    "id": item["objectID"],
                    "source": "StockX",
                    "model": item["title"],
                    "skuId": item["styleId"],
                    "size": item["shoeSize"],
                    "category": item["category"],
                    "retailPrice": item["retailPrice"],
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
        data_list.append((item["id"],item["source"],item["model"],item["skuId"],item["size"],
            item["category"],item["retailPrice"],item["lowestAsk"],item["highestBid"],item["annualHigh"],
            item["annualLow"],item["averagePrice"], item["averagePriceRank"],item["volatility"],
            item["numberOfAsks"],item["numberOfBids"], item["annualSold"], item["recentSold"],
            item["url"], item["image"]))
    
    try:
        c.executemany("""INSERT IGNORE INTO stockx_sneakers 
            (id,source,model,sku_id,size,category,retail_price,
            price,highest_bid,annual_high_price,annual_low_price,
            average_price,average_price_rank,volatility,number_of_asks,
            number_of_bids,annual_sold,recently_sold,url,image) 
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


#create_db_table()

run_scraper(6, 9)        # Range 1
#run_scraper(9.5, 12.5)   # Range 2
#run_scraper(13, 15)      # Range 3


conn.close()
