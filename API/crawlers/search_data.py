import requests
from elasticsearch import Elasticsearch
import time

""" 
	Crawls top 1000 models from each sneaker category to populate
	Elasticsearch database for search engine.
"""

es_host = "https://search-sanctuary-wnpcewotzjgc7vv4ivvgzs4fyy.us-west-2.es.amazonaws.com"
username = "master"
password = f"%3i6PK@Wu^LisMH"
es = Elasticsearch([es_host], http_auth=(username, password))

stockx_api = "https://stockx.com/api/browse"
headers = {
	"referer": "https://stockx.com/",
	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
}

categories = ["air jordan", "nike", "adidas", "other brands", "collections-filter"]
for tag in categories:
	print(tag)

	page = 1
	while page <= 50:
		parameters = {
			"_tags": tag,
			"productCategory": "sneakers",
			"gender": "men",
			"page": page
		}
		response = requests.get(stockx_api, headers=headers, params=parameters)
		if not response.ok: break

		page_data = response.json()["Products"]
		if not page_data: break

		for item in page_data:
			doc = {
				"model": item["title"],
				"sku": item["styleId"].split('/', 1)[0],
				"sales": item["market"]["salesLast72Hours"],
				"urlKey": item["urlKey"],
				"image": item["media"]["imageUrl"],
				"imageThumbnail": item["media"]["thumbUrl"]
			}
			es.index(index="browse", id=item["id"], body=doc)
		print(page)
		page += 1
	
	if tag is not categories[-1]:
		time.sleep(60)
