import requests
from urllib.parse import urlencode


def get_data(search_query, shoe_size, price_low, price_high, page, page_len):
	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
		"x-algolia-application-id": "2FWOTDVM2O",
		"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}

	post_json = {
		"params": "query=&" + urlencode({
			"query": search_query,
			"facetFilters": f'[["size_us_men:{shoe_size}"]]',
			"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
			"distinct": "true",
			"page": page,
			"hitsPerPage": page_len,
		})
	}

	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()['hits']

	results = []
	for item in request_data:
		results.append({
			'id': int(item['objectID']),
			'source': "Flight Club",
			'model': item['name'],
			'sku_id': item['sku'].replace(' ', '-'),
			'size': float(shoe_size),
			'price': int(item['lowest_price_cents']/100),
			'category': item['silhouette'],
			'shoe_condition': item['shoe_condition'],
			'trending': 1 if 'trending' in item['collection_slugs'] else 0,
			'top_seller': 1 if 'top-sellers' in item['collection_slugs'] else 0,
			'price_drop': 1 if 'price-drops' in item['collection_slugs'] else 0,
			'new_release': 1 if 'new-releases' in item['collection_slugs'] else 0,
			'url': 'https://www.flightclub.com/' + item['slug'],
			'image': item['main_picture_url'],
			'image_thumbnail': item['main_picture_url'][:27] + "300" + item['main_picture_url'][26:]
		})

	return results
