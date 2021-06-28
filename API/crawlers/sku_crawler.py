import requests
from elasticsearch import Elasticsearch
import time

es_host = "https://search-sanctuary-wnpcewotzjgc7vv4ivvgzs4fyy.us-west-2.es.amazonaws.com"
username = "master"
password = f"%3i6PK@Wu^LisMH"
es = Elasticsearch([es_host], http_auth=(username, password))


url = "https://stockx.com/api/browse"
headers = {
	"referer": "https://stockx.com/",
	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
}

tags = ["air jordan", "nike", "adidas", "other brands", "collections-filter"]
for tag in tags:
	print(tag)

	page = 1
	while page <= 50:
		parameters = {
			"_tags": tag,
			"productCategory": "sneakers",
			"gender": "men",
			"page": page
		}
		response = requests.get(url, headers=headers, params=parameters)
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
	
	if tag is not tags[-1]:
		time.sleep(60)
