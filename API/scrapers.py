import requests
from urllib.parse import urlencode


def browse_stockx(search_query, shoe_size, price_low, price_high, page, page_len):
	url = "https://stockx.com/api/browse"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
		"referer": "https://stockx.com",
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
	request_data = response.json()["Products"]

	results = []
	for item in request_data:
		if len(results) >= page_len: break
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


### NEW ###

def stockx_lowest_price(sku_id, size):
	url = "https://stockx.com/api/browse"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
	}
	parameters = {
		"_search": sku_id,
		"shoeSize": size,
		#"market.lowestAsk": f"range({price_low}|{price_high})",
	}

	response = requests.get(url, headers=headers, params=parameters)
	item_data = response.json()["Products"]

	if len(item_data) == 0: return []
	return [{
		"source": "StockX",
		"price": item_data[0]["market"]["lowestAsk"],
		"url": "stockx.com/" + item_data[0]["urlKey"]
	}]


def goat_lowest_price(sku_id, size):
    url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
    params = {
        "x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
        "x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
    }
    post_json = {
        "params": urlencode({
            "query": sku_id,
            "facetFilters": f"(product_category: shoes), (presentation_size: {size}), (single_gender: men), (shoe_condition:new_no_defects)",
            #"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
        })
    }

    response = requests.post(url, params=params, json=post_json)
    item_data = response.json()['hits']

    if len(item_data) == 0: return []
    return [{
        'source': "Goat",
        'price': int(item_data[0]['lowest_price_cents']/100),
        'url': 'goat.com/sneakers/' + item_data[0]['slug']
    }]


def flightclub_lowest_price(sku_id, size):
    url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query"
    params = {
        "x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
        "x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
    }
    post_json = {
        "params": urlencode({
            "query": sku_id,
            "facetFilters": f'[["size_us_men:{size}"],["shoe_condition:new_no_defects"]]',
            #"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]"
        })
    }

    response = requests.post(url, params=params, json=post_json)
    item_data = response.json()['hits']

    if len(item_data) == 0: return []
    return [{
        'source': "Flight Club",
        'price': int(item_data[0]['lowest_price_cents']/100),
        'url': 'flightclub.com/' + item_data[0]['slug']
    }]


def grailed_lowest_price(model_name, size):
    url = "https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries"
    params = {
        "x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
        "x-algolia-application-id": "MNRWEFSS2Q", "x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
    }
    post_json = {
        "requests": [{
            "indexName": "Listing_by_low_price_production",
            "params": urlencode({
                "query": model_name,
                "facetFilters": f"[[\"category_size:footwear.{size}\"], [\"condition:is_new\",\"condition:is_gently_used\"]]",
                #"numericFilters": f"[\"price_i>={price_low}\",\"price_i<={price_high}\"]",
            })
        }]
    }

    response = requests.post(url, params=params, json=post_json)
    item_data = response.json()["results"][0]["hits"]

    if len(item_data) == 0: return []
    return [{
        "source": "Grailed",
        "price": item_data[0]['price'],
        "url": "grailed.com/listings/" + str(item_data[0]['id'])
    }]


def klekt_lowest_price(sku_id, size):
	url = "https://apiv2.klekt.com/shop-api?vendure-token=iqrhumfu2u9mumwq369"

	product_id_query = {
		"operationName": "SearchProducts",
		"variables": {
			"input": {
				"availability": "available",
				"facetSlugs": [],
				"facetValueIds": [],
				"groupByProduct": True,
				"sizeType": None,
				"sort": {"featured": "DESC"},
				"take": 1,
                "skip": 0,
				"term": sku_id
			}
		},
		"query": """query SearchProducts($input: SearchInput!) {
			search(input: $input) { items { productId } } }"""
	}
	response1 = requests.post(url, json=product_id_query)
	product_id = response1.json()["data"]["search"]["items"][0]["productId"]

	price_query = {
		"query": """query {
			productDetails(id: %s) {
				name slug variants { availableCount priceWithTax facetValues { code } }
			}
		}""" % (product_id)
	}
	response2 = requests.post(url, json=price_query)
	product_data = response2.json()

	result = []
	product_variants = product_data["data"]["productDetails"]["variants"]
	for variant in product_variants:
		v_size = variant["facetValues"][0]["code"].replace("us", "")
		if float(v_size) == float(size):
			result = [{
				"source": "KLEKT",
				"price": variant["priceWithTax"]/100,  # PRICE IN EURO
				"url": "klekt.com/product/" + product_data["data"]["productDetails"]["slug"]
			}]

	return result


def ebay_lowest_price(sku_id, size, ship_to):
	url = "https://svcs.ebay.com/services/search/FindingService/v1"
	headers = {
		"X-EBAY-SOA-SECURITY-APPNAME": "Sanctuar-jasontho-PRD-ad4af8740-c80ac57c",
		"X-EBAY-SOA-RESPONSE-DATA-FORMAT": "JSON", "X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced"
	}
	parameters = {
		"keywords": sku_id,
		"sortOrder": "BestMatch",
		"itemFilter(0).name": "AvailableTo",
		"itemFilter(0).value": ship_to,
		"itemFilter(1).name": "Condition",
		"itemFilter(1).value": 1000,
		"itemFilter(2).name": "HideDuplicateItems",
		"itemFilter(2).value": True,
		"aspectFilter(0).aspectName": "US Shoe Size (Men's)",
		"aspectFilter(0).aspectValueName": size
	}

	response = requests.get(url, headers=headers, params=parameters)
	item_data = response.json()['findItemsAdvancedResponse'][0]['searchResult'][0]['item']

	if len(item_data) == 0: return []
	return [{
		"source": "ebay",
		"price": float(item_data[0]['sellingStatus'][0]['currentPrice'][0]['__value__']),
		"url": item_data[0]['viewItemURL'][0]
	}]


def depop_lowest_price(model_name, size):
	url = "https://webapi.depop.com/api/v2/search/products"

	size_map = {'7':'2','7.5':'3','8':'4','8.5':'5','9':'6','9.5':'7','10':'8','10.5':'9','11':'10', 
		'11.5':'11','12':'12','12.5':'13','13':'14','13.5':'15','14':'16','14.5':'17','15':'18'}
	parameters = {
		"what": model_name,
		"sizes": "6-77." + size_map[size],
		"country": "us",
		"conditions": "brand_new, used_like_new"
	}

	response = requests.get(url, params=parameters)
	item_data = response.json()["products"]

	if len(item_data) == 0: return []
	return [{
		"source": "depop",
		"price": float(item_data[0]["price"]["priceAmount"]),
		"url": "depop.com/products/" + item_data[0]["slug"]
	}]


def sneakercon_lowest_price(sku_id, size):
	url = "https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/all"
	headers = {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
		"origin": "https://sneakercon.com"
	}
	parameters = {
		"search": sku_id,
		"size": size,
		"limit": "1",
		"isNew": "true"
	}

	response = requests.get(url, headers=headers, params=parameters)
	request_data = response.json()

	item = request_data[0]
	prices_url = f"https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/bid/new/makeofferdetails/{item['id']}"
	price_data = requests.get(prices_url, headers=headers).json()
	item_price = None
	for p in price_data:
		if p['size'] == size:
			item_price = p['salePrice']

	return [{
		"source": 'sneakercon',
		"price": item_price,
		"url": "sneakercon.com/product/" + str(item['id']) + '-' + item['nickname'].replace(' ', '-')
	}]


### USED ###

def goat_used(sku_id, size):
	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
	params = {
		"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
		"x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
	}

	post_json = {
		"params": urlencode({
			"query": sku_id,
			"facetFilters": f"(presentation_size: {size}), (shoe_condition:used, shoe_condition:new_with_defects)",
			#"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
		})
	}

	response = requests.post(url, params=params, json=post_json)
	request_data = response.json()['hits']

	results = []
	for item in request_data:
		url_suffix = '/used' if item['shoe_condition'] == 'used' else '/defects'
		results.append({
			'source': "goat",
			'price': int(item['lowest_price_cents']/100),
			'condition': item['shoe_condition'],
			'image': item['grid_display_picture_url'],
			'url': 'goat.com/sneakers/' + item['slug'] + url_suffix
		})

	return results


def grailed_used(model_name, size, max_items=5):
	url = "https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries"
	params = {
		"x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
		"x-algolia-application-id": "MNRWEFSS2Q", "x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
	}
	post_json = {
		"requests": [{
			"indexName": "Listing_production",
			"params": urlencode({
				"query": model_name,
				"facetFilters": f"[[\"category_size:footwear.{size}\"]]",
				#"numericFilters": f"[\"price_i>={price_low}\",\"price_i<={price_high}\"]",
			})
		}]
	}

	response = requests.post(url, params=params, json=post_json)
	request_data = response.json()["results"][0]["hits"]

	results = []
	for item in request_data:
		if len(results) >= max_items: break
		results.append({
			"source": "grailed",
			"price": item['price'],
			"image": item['cover_photo']['url'],
			"url": "grailed.com/listings/" + str(item['id'])
		})

	return results


def ebay_used(query, size, ship_to, max_items=5):
	url = "https://svcs.ebay.com/services/search/FindingService/v1"
	headers = {
		"X-EBAY-SOA-SECURITY-APPNAME": "Sanctuar-jasontho-PRD-ad4af8740-c80ac57c",
		"X-EBAY-SOA-RESPONSE-DATA-FORMAT": "JSON",
		"X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced"
	}

	parameters = {
		"keywords": query,
		"categoryId": "93427",
		"sortOrder": "BestMatch",
		"itemFilter(0).name": "AvailableTo",
		"itemFilter(0).value": ship_to,
		"itemFilter(1).name": "HideDuplicateItems",
		"itemFilter(1).value": True,
		"itemFilter(2).name": "ListingType",
		"itemFilter(2).value": "FixedPrice",
		"aspectFilter(0).aspectName": "US Shoe Size (Men's)",
		"aspectFilter(0).aspectValueName": size
	}

	response = requests.get(url, headers=headers, params=parameters)
	item_data = response.json()['findItemsAdvancedResponse'][0]['searchResult'][0]['item']

	results = []
	for item in item_data:
		if len(results) >= max_items: break
		results.append({
			"source": "ebay",
			"price": float(item['sellingStatus'][0]['currentPrice'][0]['__value__']),
			"image": item['galleryURL'][0],
			"url": item['viewItemURL'][0]
		})

	return results


def depop_used(model_name, size, max_items=5):
	url = "https://webapi.depop.com/api/v2/search/products"

	size_map = {'7':'2','7.5':'3','8':'4','8.5':'5','9':'6','9.5':'7','10':'8','10.5':'9','11':'10', 
		'11.5':'11','12':'12','12.5':'13','13':'14','13.5':'15','14':'16','14.5':'17','15':'18'}
	parameters = {
		"what": model_name,
		"sizes": "6-77." + size_map[size],
		"itemsPerPage": max_items,
		"country": "us"
	}

	response = requests.get(url, params=parameters)
	item_data = response.json()["products"]

	results = []
	for item in item_data:
		if len(results) >= max_items: break
		results.append({
			"source": "depop",
			"price": float(item["price"]["priceAmount"]),
			"image": item["preview"]["320"],
			"url": "depop.com/products/" + item["slug"]
		})

	return results

