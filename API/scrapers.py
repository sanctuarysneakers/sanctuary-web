import requests
from urllib.parse import urlencode


def get_stockx_data(search_query, shoe_size, price_low, price_high, page, page_len):
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


def get_goat_data(search_query, shoe_size, price_low, price_high, page, page_len):
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


def get_flightclub_data(search_query, shoe_size, price_low, price_high, page, page_len):
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
			'size': float(shoe_size),
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


def get_grailed_data(search_query, shoe_size, price_low, price_high, sort_by, page, page_len):
	url = "https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries"
	params = {
		"x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
		"x-algolia-application-id": "MNRWEFSS2Q",
		"x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
	}

	indexes = {
		"": "Listing_production", # default
		"trending": "Listing_by_heat_production",
		"popular": "Listing_by_followers_production",
		"new": "Listing_by_date_added_production",
		"price_low": "Listing_by_low_price_production",
		"price_high": "Listing_by_high_price_production",
	}

	post_json = {
		"requests": [{
			"indexName": indexes[sort_by],
			"params": urlencode({
				"query": search_query,
				"facetFilters": f"[[\"category_size:footwear.{shoe_size}\"], [\"category_path:footwear.hitop_sneakers\", \"category_path:footwear.lowtop_sneakers\"]]",
				"numericFilters": f"[\"price_i>={price_low}\",\"price_i<={price_high}\"]",
				"offset": f"{page * page_len}",
				"length": f"{page_len}"
			})
		}]
	}
	response = requests.post(url, params=params, json=post_json)
	response.raise_for_status()
	request_data = response.json()["results"][0]["hits"]

	results = []
	for item in request_data:
		results.append({
			"id": int(item['id']),
			"source": "Grailed",
			"url": "grailed.com/listings/" + str(item['id']),
			"category": item['designer_names'],
			"model": item['title'],
			"size": float(shoe_size),
			"price": item['price'],
			"old_price": item['price_drops'][-2] if len(item['price_drops']) > 1 else None,
			"shoe_condition": item['condition'],
			"sku_id": None if item['sku_id'] is None else str(item['sku_id']),
			"image": item['cover_photo']['url'],
			"image_thumbnail": 
				"https://process.fs.grailed.com/auto_image/resize=width:320/output=quality:60/compress/" + item['cover_photo']['url'],
			"date_bumped": item['bumped_at'][:10],
			"date_created": item['cover_photo']['created_at'][:10],
			"heat": item['heat'],
			"seller_location": item['location'],
			"seller_rating": round(item['user']['seller_score']['rating_average'], 1) if
				item['user']['seller_score']['rating_average'] else None,
			"seller_rating_count": item['user']['seller_score']['rating_count'],
			"shipping_us": item['shipping']['us']['amount'] if item['shipping']['us']['enabled'] else None,
			"shipping_ca": item['shipping']['ca']['amount'] if item['shipping']['ca']['enabled'] else None,
			"shipping_uk": item['shipping']['uk']['amount'] if item['shipping']['uk']['enabled'] else None,
			"shipping_eu": item['shipping']['eu']['amount'] if item['shipping']['eu']['enabled'] else None,
			"shipping_asia": item['shipping']['asia']['amount'] if item['shipping']['asia']['enabled'] else None,
			"shipping_au": item['shipping']['au']['amount'] if item['shipping']['au']['enabled'] else None,
			"shipping_other": item['shipping']['other']['amount'] if item['shipping']['other']['enabled'] else None
		})
	
	return results


def get_sneakercon_data(search_query, shoe_size, price_low, price_high, page, page_len):
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
		"size": shoe_size,
		"search": search_query,
		"offset": "0",
		"limit": "24",
		"isNew": "true"
	}
	response = requests.get(url, headers=headers, params=parameters)
	response.raise_for_status()
	request_data = response.json()

	results = []
	for item in request_data:
		if len(results) >= page_len:
			break
		
		# NOTE: Getting price data is expensive because for each item
		# we have to make a network request to another API endpoint.
		# This will be fixed in the redesign, where we load prices
		# after a user clicks on a certain shoe.
		prices_url = f"https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/bid/new/makeofferdetails/{item['id']}"
		price_data = requests.get(prices_url, headers=headers).json()
		item_price = None
		for p in price_data:
			if p['size'] == shoe_size:
				item_price = p['salePrice']
		
		results.append({
			"id": item['id'],
			"source": 'Sneaker Con',
			"model": item['description'] + ' ' + item['nickname'],
			"sku_id": item['sku'].replace(' ', '-'),
			"size": float(shoe_size),
			"price": item_price,
			"shoe_condition": 'New',
			"category": item['category'],
			"url": "sneakercon.com/product/" + str(item['id']) + '-' + item['nickname'].replace(' ', '-'),
			"image": item['pictures'][0],
			"image_thumbnail": item['pictures'][0]
		})

	return results

