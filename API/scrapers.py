import requests
from cachetools import cached, TTLCache


@cached(cache=TTLCache(maxsize=32768, ttl=3600))
def browse_stockx(search, page=1):
	url = "https://stockx.com/api/browse"
	headers = {
		"referer": "https://stockx.com/",
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
	}
	parameters = {
		"_search": search,
		"productCategory": "sneakers",
		"page": page
	}

	response = requests.get(url, headers=headers, params=parameters)
	try:
		item_data = response.json()["Products"]
		results = []
		for item in item_data:
			results.append({
				"id": item["id"],
				"model": item["title"],
				"sku": item["styleId"],
				"urlKey": item["urlKey"],
				"imageThumbnail": item["media"]["thumbUrl"]
			})
		return results
	except:
		return None


@cached(cache=TTLCache(maxsize=32768, ttl=3600))
def stockx_lowest_price(search, size):
	url = "https://stockx.com/api/browse"
	headers = {
		"referer": "https://stockx.com/",
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
	}
	parameters = {
		"_search": search,
		"shoeSize": size,
		#"market.lowestAsk": f"range({price_low}|{price_high})",
	}

	response = requests.get(url, headers=headers, params=parameters)
	try:
		item_data = response.json()["Products"]
		return [] if not item_data else [{
			"source": "stockx",
			"price": item_data[0]["market"]["lowestAsk"],
			"url": "stockx.com/" + item_data[0]["urlKey"]
		}]
	except:
		return None


@cached(cache=TTLCache(maxsize=32768, ttl=3600))
def ebay_lowest_price(search, size, ship_to):
	url = "https://svcs.ebay.com/services/search/FindingService/v1"
	headers = {
		"X-EBAY-SOA-SECURITY-APPNAME": "Sanctuar-jasontho-PRD-ad4af8740-c80ac57c",
		"X-EBAY-SOA-RESPONSE-DATA-FORMAT": "JSON", "X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced"
	}
	parameters = {
		"keywords": search,
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
	try:
		item_data = response.json()['findItemsAdvancedResponse'][0]['searchResult'][0]['item']
		return [] if not item_data else [{
			"source": "ebay",
			"price": float(item_data[0]['sellingStatus'][0]['currentPrice'][0]['__value__']),
			"url": item_data[0]['viewItemURL'][0]
		}]
	except:
		return None


@cached(cache=TTLCache(maxsize=32768, ttl=3600))
def ebay_listings(search, size, ship_to, max_items=7):
	url = "https://svcs.ebay.com/services/search/FindingService/v1"
	headers = {
		"X-EBAY-SOA-SECURITY-APPNAME": "Sanctuar-jasontho-PRD-ad4af8740-c80ac57c",
		"X-EBAY-SOA-RESPONSE-DATA-FORMAT": "JSON",
		"X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced"
	}
	parameters = {
		"keywords": search,
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
	try:
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
	except:
		return None


@cached(cache=TTLCache(maxsize=32768, ttl=3600))
def depop_listings(search, size, max_items=7):
	url = "https://webapi.depop.com/api/v2/search/products"
	size_map = {'7':'2','7.5':'3','8':'4','8.5':'5','9':'6','9.5':'7','10':'8','10.5':'9','11':'10', 
		'11.5':'11','12':'12','12.5':'13','13':'14','13.5':'15','14':'16','14.5':'17','15':'18'}
	parameters = {
		"what": search,
		"sizes": "6-77." + size_map[size],
		"itemsPerPage": max_items,
		"country": "us"
	}

	response = requests.get(url, params=parameters)
	try:
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
	except:
		return None



# def sneakercon_lowest_price(sku_id, size):
# 	url = "https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/all"
# 	headers = {
# 		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
# 		"origin": "https://sneakercon.com"
# 	}
# 	parameters = {
# 		"search": sku_id,
# 		"size": size,
# 		"limit": "1",
# 		"isNew": "true"
# 	}

# 	response = requests.get(url, headers=headers, params=parameters)
# 	request_data = response.json()

# 	item = request_data[0]
# 	prices_url = f"https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/bid/new/makeofferdetails/{item['id']}"
# 	price_data = requests.get(prices_url, headers=headers).json()
# 	item_price = None
# 	for p in price_data:
# 		if p['size'] == size:
# 			item_price = p['salePrice']

# 	return [{
# 		"source": 'sneakercon',
# 		"price": item_price,
# 		"url": "sneakercon.com/product/" + str(item['id']) + '-' + item['nickname'].replace(' ', '-')
# 	}]



# def goat_used(sku_id, size):
# 	url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
# 	params = {
# 		"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
# 		"x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
# 	}
# 	post_json = {
# 		"params": urlencode({
# 			"query": sku_id,
# 			"facetFilters": f"(presentation_size: {size}), (shoe_condition:used, shoe_condition:new_with_defects)",
# 			#"numericFilters": f"[\"lowest_price_cents_usd>={price_low*100}\",\"lowest_price_cents_usd<={price_high*100}\"]",
# 		})
# 	}

# 	response = requests.post(url, params=params, json=post_json)
# 	request_data = response.json()['hits']

# 	results = []
# 	for item in request_data:
# 		url_suffix = '/used' if item['shoe_condition'] == 'used' else '/defects'
# 		results.append({
# 			'source': "goat",
# 			'price': int(item['lowest_price_cents']/100),
# 			'condition': item['shoe_condition'],
# 			'image': item['grid_display_picture_url'],
# 			'url': 'goat.com/sneakers/' + item['slug'] + url_suffix
# 		})
# 	return results
