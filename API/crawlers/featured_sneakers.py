import requests
from elasticsearch import Elasticsearch

""" 
	Crawls top 100 featured models to populate Elasticsearch 
	database for browse page default search query.
"""

es_host = "https://search-sanctuary-wnpcewotzjgc7vv4ivvgzs4fyy.us-west-2.es.amazonaws.com"
username = "master"
password = f"%3i6PK@Wu^LisMH"
es = Elasticsearch([es_host], http_auth=(username, password))

stock_api = "https://stockx.com/api/browse"
headers = {
	"referer": "https://stockx.com/",
	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
}

page = 1
while page <= 5:
	parameters = {
		"productCategory": "sneakers",
		"gender": "men",
		"page": page
	}
	response = requests.get(stock_api, headers=headers, params=parameters)
	if not response.ok: break

	page_data = response.json()["Products"]
	if not page_data: break

	for i, item in enumerate(page_data):
		doc = {
			"model": item["title"],
			"sku": item["styleId"].split('/', 1)[0],
			"rank": int(f"{page}{i:02}"),
			"urlKey": item["urlKey"],
			"image": item["media"]["imageUrl"],
			"imageThumbnail":
				item["media"]["thumbUrl"].split('?')[0] + "?fit=fill&w=155&h=100&auto=format&q=90&dpr=3"
		}
		es.index(index="featured", id=item["id"], body=doc)
	print(page)
	page += 1
