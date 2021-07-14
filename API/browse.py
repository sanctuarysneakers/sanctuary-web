from elasticsearch import Elasticsearch

def browse_es(search):
	es_host = "https://search-sanctuary-wnpcewotzjgc7vv4ivvgzs4fyy.us-west-2.es.amazonaws.com"
	username = "master"
	password = f"%3i6PK@Wu^LisMH"
	es = Elasticsearch([es_host], http_auth=(username, password))

	if search:
		response = es.search(index="browse", body={
			"query": {
				"function_score": {
					"query": { "match": { "model": search } },
					"functions": [{
						"field_value_factor": {
							"field": "sales",
							"factor": 1/200
						}
					}],
					"boost_mode": "sum",
					"max_boost": 2
				}
			}
		}, size=24)
	else:
		response = es.search(index="featured", body={
			"query": { "match_all": {} }
		}, sort="rank", size=24)

	browse_data = response["hits"]["hits"]

	results = []
	for item in browse_data:
		results.append({
			"id": item["_id"],
			"model": item["_source"]["model"],
			"sku": item["_source"]["sku"],
			"urlKey": item["_source"]["urlKey"],
			"image": item["_source"]["image"],
			"imageThumbnail": item["_source"]["imageThumbnail"]
		})
	return results
