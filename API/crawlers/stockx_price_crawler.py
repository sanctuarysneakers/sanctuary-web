import requests
import mysql.connector
import time
from datetime import datetime
import json

db_host = "mysql-db-master.cmamugrum56i.us-west-2.rds.amazonaws.com"
db_user = "admin"
db_password = "4tDqfnvbQ8R8RGuh"
conn = mysql.connector.connect(host=db_host, user=db_user, passwd=db_password)
cursor = conn.cursor(dictionary=True)
cursor.execute("USE sneakers;")


url = "https://stockx.com/api/browse"
headers = {
	"referer": "https://stockx.com/",
	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
}

sizes = ['8', '9', '10', '11', '12', '13']
for size in sizes:
	print(f"Size {size}")
	page = 1
	while page <= 50:
		parameters = {
			"_search": "",
			"productCategory": "sneakers",
			"shoeSize": size,
			"gender": "men",
			"page": page
		}
		response = requests.get(url, headers=headers, params=parameters)
		page_data = response.json()["Products"]
		if not page_data: break

		for item in page_data:
			if not item["styleId"]: continue
			
			try:
				query = f"""REPLACE INTO stockx_price_cache (sku, size, timestamp, data)
					VALUES (%s, %s, %s, %s);"""
				cursor.execute(query, (
					item["styleId"], size, datetime.now(), json.dumps(item))
				)
			except:
				continue
		conn.commit()

		print(page)
		page += 1
	
	if size != sizes[-1]:
		time.sleep(60)

cursor.close()
conn.close()
