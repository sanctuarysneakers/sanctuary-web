import requests
from urllib.parse import urlencode


def get_data(search_query, shoe_size, price_low, price_high, sort_by, page, page_len):
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