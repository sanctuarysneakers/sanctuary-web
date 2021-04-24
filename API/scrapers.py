import requests
from urllib.parse import urlencode


def browse_stockx(search_query, shoe_size, price_low, price_high, page, page_len):
	"""
		Queries StockX and returns a list of sneaker data
	"""
	
	url = "https://stockx.com/api/browse"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
		"referer": "https://stockx.com",
		"accept": "*/*",
		"accept-encoding": "gzip, deflate, br",
		"accept-language": "en-US,en;q=0.9,sq;q=0.8,it;q=0.7",
		"appos": "web",
		"appversion": "0.1",
		"x-requested-with": "XMLHttpRequest",
		"cache-control": "no-cache"
	}
	parameters = {
		"productCategory": "sneakers",
		"_search": search_query,
		"gender": "men",
		"shoeSize": shoe_size,
		"market.lowestAsk": f"range({price_low}|{price_high})",
		"page": page
	}

	response = requests.get(url, headers=headers, params=parameters)
	response.raise_for_status()
	request_data = response.json()["Products"]

	results = []
	for item in request_data:
		if len(results) >= page_len:
			break
		
		results.append({
			"id": abs(hash(item["objectID"]) % (10**7)),
			"source": "StockX",
			"model": item["title"],
			"sku_id": item["styleId"],
			"size": float(shoe_size),
			"price": item["market"]["lowestAsk"],
			"shoe_condition": item["condition"],
			"category": item["category"],
			"url": "stockx.com/" + item["urlKey"],
			"image": item["media"]["imageUrl"],
			"image_thumbnail": item["media"]["imageUrl"].split('?', 1)[0] + "?w=300&q=50&trim=color"
		})

	return results


def browse_goat(search_query, shoe_size, price_low, price_high, page, page_len):
	"""
		Queries Goat and returns a list of sneaker data
	"""
	
	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
		"x-algolia-application-id": "2FWOTDVM2O",
		"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}
	post_json = {
		"params": urlencode({
			"query": search_query,
			"facetFilters": f"(product_category: shoes), (presentation_size: {shoe_size}), (single_gender: men)",
			"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
			"distinct": "true",
			"offset": page * page_len,
			"length": page_len
		})
	}

	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()['hits']
	
	results = []
	for item in request_data:
		results.append({
			'id': int(item['objectID']),
			'source': "Goat",
			'model': item['name'],
			'sku_id': item['sku'].replace(' ', '-'),
			'size': float(shoe_size),
			'price': int(item['lowest_price_cents']/100),
			'category': item['silhouette'],
			'shoe_condition': item['shoe_condition'],
			'trending': 1 if 'trending' in item['collection_slugs'] else 0,
			'just_dropped': 1 if 'just-dropped' in item['collection_slugs'] else 0,
			'url': 'goat.com/sneakers/' + item['slug'],
			'image': item['main_picture_url'],
			'image_thumbnail': item['main_picture_url'][:23] + "300" + item['main_picture_url'][26:]
		})
	
	return results


def browse_flightclub(search_query, shoe_size, price_low, price_high, page, page_len):
	"""
		Queries Flight Club and returns a list of sneaker data
	"""
	
	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
		"x-algolia-application-id": "2FWOTDVM2O",
		"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}
	post_json = {
		"params": urlencode({
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
			'price': int(item['lowest_price_cents']/100),
			'category': item['silhouette'],
			'shoe_condition': item['shoe_condition'],
			'trending': 1 if 'trending' in item['collection_slugs'] else 0,
			'top_seller': 1 if 'top-sellers' in item['collection_slugs'] else 0,
			'price_drop': 1 if 'price-drops' in item['collection_slugs'] else 0,
			'new_release': 1 if 'new-releases' in item['collection_slugs'] else 0,
			'url': 'flightclub.com/' + item['slug'],
			'image': item['main_picture_url'],
			'image_thumbnail': item['main_picture_url'][:27] + "300" + item['main_picture_url'][26:]
		})

	return results



def goat_lowest_price(sku_id, size, price_low, price_high):
	"""
		Gets the lowest price for a new model from Goat
	"""

	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
		"x-algolia-application-id": "2FWOTDVM2O",
		"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}
	post_json = {
		"params": urlencode({
			"query": sku_id,
			"facetFilters": f"(product_category: shoes), (presentation_size: {size}), (single_gender: men), (shoe_condition:new_no_defects)",
			"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
		})
	}

	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()['hits']

	item = request_data[0]
	return [{
		'source': "Goat",
		'price': int(item['lowest_price_cents']/100),
		'condition': item['shoe_condition'],
		'url': 'goat.com/sneakers/' + item['slug']
	}]


def goat_used_lowest_price(sku_id, size, price_low, price_high):
	"""
		Gets the lowest price for a used model from Goat
	"""

	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
		"x-algolia-application-id": "2FWOTDVM2O",
		"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}
	post_json = {
		"params": urlencode({
			"query": sku_id,
			"facetFilters": f"(product_category: shoes), (presentation_size: {size}), (single_gender: men), (shoe_condition:used, shoe_condition:new_with_defects)",
			"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
		})
	}

	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()['hits']

	item = request_data[0]
	url_suffix = '/used' if item['shoe_condition'] == 'used' else '/defects'
	return [{
		'source': "Goat (Used)",
		'price': int(item['lowest_price_cents']/100),
		'condition': item['shoe_condition'],
		'url': 'goat.com/sneakers/' + item['slug'] + url_suffix
	}]


def flightclub_lowest_price(sku_id, size, price_low, price_high):
	"""
		Gets the lowest price for a new model from Flight Club
	"""

	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
		"x-algolia-application-id": "2FWOTDVM2O",
		"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}
	post_json = {
		"params": urlencode({
			"query": sku_id,
			"facetFilters": f'[["size_us_men:{size}"]]',
			"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]"
		})
	}

	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()['hits']

	item = request_data[0]
	return [{
		'source': "Flight Club",
		'price': int(item['lowest_price_cents']/100),
		'condition': item['shoe_condition'],
		'url': 'flightclub.com/' + item['slug']
	}]


def stockx_lowest_price(sku_id, size, price_low, price_high):
	"""
		Gets the lowest price for a new model from StockX
	"""

	url = "https://stockx.com/api/browse"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
		"referer": "https://stockx.com",
		"accept": "*/*",
		"accept-language": "en-US,en;q=0.9,sq;q=0.8,it;q=0.7",
		"appos": "web",
		"appversion": "0.1",
		"x-requested-with": "XMLHttpRequest",
		"cache-control": "no-cache"
	}
	parameters = {
		"_search": sku_id,
		"shoeSize": size,
		"gender": "men",
		"market.lowestAsk": f"range({price_low}|{price_high})",
	}

	response = requests.get(url, headers=headers, params=parameters)
	response.raise_for_status()
	request_data = response.json()["Products"]

	item = request_data[0]
	return [{
		"source": "StockX",
		"price": item["market"]["lowestAsk"],
		"condition": item["condition"],
		"url": "stockx.com/" + item["urlKey"]
	}]


def klekt_lowest_price(sku_id, size):
	"""
		Gets the lowest price for a new model from KLEKT
	"""
	
	url = "https://apiv2.klekt.com/shop-api?vendure-token=iqrhumfu2u9mumwq369"
	headers = {
		"accept": "application/json, text/plain, */*",
		"content-type": "application/json;charset=UTF-8",
		"origin": "https://www.klekt.com",
		"referer": "https://www.klekt.com/",
		"sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-site",
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
	}

	product_id_query = {
		"operationName": "SearchProducts",
		"variables": {
			"input": {
				"availability": "available",
				"facetSlugs": [],
				"facetValueIds": [],
				"groupByProduct": True,
				"sizeType": None,
				"skip": 0,
				"sort": {"featured": "DESC"},
				"take": 6,
				"term": sku_id
			}
		},
		"query": """query SearchProducts($input: SearchInput!) {
			search(input: $input) {
				items { productId }
			}
		}"""
	}
	product_id_json = requests.post(url, headers=headers, json=product_id_query).json()
	product_id = product_id_json["data"]["search"]["items"][0]["productId"]

	price_query = {
		"query": """query {
			productDetails(id: %s) {
				name
				slug
				variants {
					availableCount
					priceWithTax
					facetValues { code }
				}
			}
		}""" % (product_id)
	}
	product_data = requests.post(url, headers=headers, json=price_query).json()

	result = []
	product_variants = product_data["data"]["productDetails"]["variants"]
	for variant in product_variants:
		v_size = variant["facetValues"][0]["code"].replace("us", "")
		if float(v_size) == float(size):
			result = [{
				"source": "KLEKT",
				"price": variant["priceWithTax"]/100,
				"condition": "New",
				"url": "klekt.com/product/" + product_data["data"]["productDetails"]["slug"]
			}]

	return result


def sneakercon_new_lowest_price(sku_id, size):
	"""
		Gets the lowest price for a new model from Sneaker Con
	"""

	url = "https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/all"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
		"origin": "https://sneakercon.com",
		"referer": "https://sneakercon.com/",
		"accept": "application/json",
		"sec-ch-ua-mobile": "?0",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "cross-site"
	}
	parameters = {
		"search": sku_id,
		"size": size,
		"limit": "1",
		"isNew": "true"
	}

	response = requests.get(url, headers=headers, params=parameters)
	response.raise_for_status()
	request_data = response.json()

	item = request_data[0]
	prices_url = f"https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/bid/new/makeofferdetails/{item['id']}"
	price_data = requests.get(prices_url, headers=headers).json()
	item_price = None
	for p in price_data:
		if p['size'] == str(size):
			item_price = p['salePrice']

	return [{
		"source": 'Sneaker Con',
		"price": item_price,
		"condition": 'New',
		"url": "sneakercon.com/product/" + str(item['id']) + '-' + item['nickname'].replace(' ', '-')
	}]


def sneakercon_used_lowest_price(sku_id, size):
	"""
		Gets the lowest price for a used model from Sneaker Con
	"""

	url = "https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/all"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
		"origin": "https://sneakercon.com",
		"referer": "https://sneakercon.com/",
		"accept": "application/json",
		"sec-ch-ua-mobile": "?0",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "cross-site"
	}
	parameters = {
		"search": sku_id,
		"size": size,
		"condition": "USED,NEW_CONDITIONAL",
		"limit": "1",
		"isNew": "True"
	}

	response = requests.get(url, headers=headers, params=parameters)
	response.raise_for_status()
	request_data = response.json()

	item = request_data[0]
	used_api_1 = f"https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/listing?condition=USED&catalogItemId={item['id']}"
	used_api_2 = f"https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/listing?condition=NEW_CONDITIONAL&catalogItemId={item['id']}"
	used_data = requests.get(used_api_1, headers=headers).json()
	used_data += requests.get(used_api_2, headers=headers).json()

	result = []
	for elem in used_data:
		if elem['item']['size'] == str(size):
			if len(result) == 0 or result[0]["price"] > elem['marketplacePrice']:
				result = [{
					"source": 'Sneaker Con (Used)',
					"price": elem['marketplacePrice'],
					"condition": elem['itemCondition'],
					"url": "sneakercon.com/product/" + str(item['id']) + '-' + item['nickname'].replace(' ', '-')
				}]

	return result


def grailed_listings(model_name, size, price_low, price_high, max_items=10):
	"""
		Queries Grailed and returns a list of used sneaker prices for a model
	"""

	url = "https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries"
	params = {
		"x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
		"x-algolia-application-id": "MNRWEFSS2Q",
		"x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
	}
	sort_by = {
		"default": "Listing_production",
		"trending": "Listing_by_heat_production",
		"popular": "Listing_by_followers_production",
		"new": "Listing_by_date_added_production",
		"price_low": "Listing_by_low_price_production",
		"price_high": "Listing_by_high_price_production",
	}
	post_json = {
		"requests": [{
			"indexName": sort_by["price_low"],
			"params": urlencode({
				"query": model_name,
				"facetFilters": f"[[\"category_size:footwear.{size}\"], [\"category_path:footwear.hitop_sneakers\", \"category_path:footwear.lowtop_sneakers\"]]",
				"numericFilters": f"[\"price_i>={price_low}\",\"price_i<={price_high}\"]",
			})
		}]
	}

	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()["results"][0]["hits"]

	results = []
	for idx, item in enumerate(request_data):
		if idx >= max_items: break
		results.append({
			"id": int(item['id']),
			"source": "Grailed",
			"price": item['price'],
			"condition": item['condition'],
			"shipping_us": item['shipping']['us']['amount'] if item['shipping']['us']['enabled'] else None,
			"shipping_ca": item['shipping']['ca']['amount'] if item['shipping']['ca']['enabled'] else None,
			"shipping_uk": item['shipping']['uk']['amount'] if item['shipping']['uk']['enabled'] else None,
			"shipping_eu": item['shipping']['eu']['amount'] if item['shipping']['eu']['enabled'] else None,
			"shipping_asia": item['shipping']['asia']['amount'] if item['shipping']['asia']['enabled'] else None,
			"shipping_au": item['shipping']['au']['amount'] if item['shipping']['au']['enabled'] else None,
			"shipping_other": item['shipping']['other']['amount'] if item['shipping']['other']['enabled'] else None,
			"image": item['cover_photo']['url'],
			"url": "grailed.com/listings/" + str(item['id'])
		})

	return results


def depop_listings(model_name, size, max_items=10):
    url = "https://webapi.depop.com/api/v2/search/products"
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    }

    size_map = {7:"2", 7.5:"3", 8:"4", 8.5:"5", 9:"6", 9.5:"7", 10:"8", 10.5:"9", 11:"10", 11.5:"11",
        12: "12", 12.5:"13", 13:"14", 13.5:"15", 14:"16", 14.5:"17", 15:"18"}

    parameters = {
        "what": model_name,
        "sizes": "6-77." + size_map[size],
        "itemsPerPage": max_items,
        "country": "us"
    }

    response = requests.get(url, headers=headers, params=parameters)
    response.raise_for_status()
    item_data = response.json()["products"]

    results = []
    for item in item_data:
        results.append({
            "id": item["id"],
            "source": "Depop",
            "price": float(item["price"]["priceAmount"]),
            "image": item["preview"]["320"],
            "url": "depop.com/products/" + item["slug"]
        })

    return results


def ebay_listings(sku_id, size, max_items=10):
	url = "https://svcs.ebay.com/services/search/FindingService/v1?"
	headers = {
		"X-EBAY-SOA-SECURITY-APPNAME": "Sanctuar-jasontho-PRD-ad4af8740-c80ac57c",
		"X-EBAY-SOA-RESPONSE-DATA-FORMAT": "JSON",
		"X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced",
	}
	parameters = {
		"keywords": sku_id,
		"categoryId": "93427", # mens shoes
		"aspectFilter(0).aspectName": "US Shoe Size (Men's)",
		"aspectFilter(0).aspectValueName": str(size),
		"sortOrder": "PricePlusShippingLowest",
		"paginationInput.entriesPerPage": max_items
	}

	response = requests.get(url, headers=headers, params=parameters)
	item_data = response.json()['findItemsAdvancedResponse'][0]['searchResult'][0]['item']

	results = []
	for item in item_data:
		results.append({
			"id": item['itemId'][0],
			"source": "eBay",
			"price": float(item['sellingStatus'][0]['currentPrice'][0]['__value__']),
			
			#TODO: Get shipping price depending on location
			
			"condition": item['condition'][0]['conditionDisplayName'][0],
			"image": item['galleryURL'][0],
			"url": item['viewItemURL'][0]
		})

	return results

