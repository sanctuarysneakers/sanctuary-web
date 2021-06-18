import requests
from elasticsearch import Elasticsearch

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])


url = "https://stockx.com/api/browse"
headers = {
	"referer": "https://stockx.com/",
	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
}

page = 1
while page <= 50:
	parameters = {
		"_search": "",
		"productCategory": "sneakers",
		"gender": "men",
		"page": page
	}
	response = requests.get(url, headers=headers, params=parameters)
	page_data = response.json()["Products"]
	for i, item in enumerate(page_data):
		doc = {
			"rank": int(f"{page}{i:02d}"), # ex: rank 100: page 1, item 0
			"model": item["title"],
			"sku": item["styleId"],
			"urlKey": item["urlKey"],
			"image": item["media"]["imageUrl"],
			"imageThumbnail": item["media"]["thumbUrl"]
		}
		es.index(index='browse', id=item["id"], body=doc)
	print(page)
	page += 1
