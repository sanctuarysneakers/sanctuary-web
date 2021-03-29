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
			image TEXT,
			image_thumbnail TEXT
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


def get_api_data(s_query, size):
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
	page = 1
	while page <= 20:
		parameters = {
			"_tags": s_query,
			"productCategory": "sneakers",
			"shoeSize": size,
			"gender": "men",
			"sort": "most-active",
			"order": "DESC",
			"page": str(page)
		}
		response = requests.get(url, headers=headers, params=parameters)
		if not response.ok:
			print(response)
			return items
		
		feed = response.json()["Products"]
		if len(feed) == 0:
			break

		print(s_query + ": page " + str(page) + ", size " + size)
		for item in feed:
			try:
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
					"image": item["media"]["imageUrl"],
					"image_thumbnail": item["media"]["imageUrl"].split('?', 1)[0] + "?w=400&q=50&trim=color"
				}
				items.append(item_data)
			except KeyError:
				continue
		
		page += 1
		time.sleep(1.5)

	return items


def insert_items(item_data):
	""" Inserts feed items into db.

	Loops through all items in the feed and inserts them into the db
	if they don't already exist. If a certain item already exists in the db,
	it updates information if it has changed.

	Arguments:
		List[Dict] item_data: A list of dict's containing data for each feed item.

	Returns:
		No return value.
	"""

	data_list = []
	for item in item_data:
		data_list.append((item["id"],item["source"],item["model"],item["skuId"],item["size"],item["price"],
			item["condition"],item["category"],item["recentSold"],item["annualSold"],item["retailPrice"],
			item["highestBid"],item["annualHigh"],item["annualLow"],item["averagePrice"],item["volatility"], 
			item["numberOfAsks"], item["numberOfBids"], item["url"], item["image"], item["image_thumbnail"]))
	
	try:
		c.executemany("""INSERT IGNORE INTO stockx_sneakers_tmp
			(id,source,model,sku_id,size,price,shoe_condition,category,
			recently_sold,annual_sold,retail_price,highest_bid,
			annual_high_price,annual_low_price,average_price,
			volatility,number_of_asks,number_of_bids,url,image,image_thumbnail) 
			VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""", data_list)
		conn.commit()
	except ProgrammingError:
		pass

	conn.commit()


def run_scraper():
	""" Runs the Stockx Scraper """

	categoryList = ["air jordan","air max,nike","air force,nike","nike basketball,nike","yeezy,adidas","ultra boost,adidas"]
	sizes = ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15']

	# Get a list of all the item data from the api
	data = []
	interval = 0
	for category in categoryList:
		for size in sizes:
			data.extend(get_api_data(category, size))
			interval += 1
			if (interval % 5 == 0):
				time.sleep(150)
	print("Scraped:", len(data), "items.")

	# Insert items into the database
	insert_items(data)


create_db_table()
run_scraper()
alter_db_table()

conn.close()