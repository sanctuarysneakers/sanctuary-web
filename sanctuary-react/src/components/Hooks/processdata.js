const conditionsMap = {
	'stockx': {
		"New": "New"
	},
	'goat': {
		"new_no_defects": "New",
		"new_with_defects": "New With Defects",
		"used": "Used",
		"goat_clean": "GOAT Clean"
	},
	'grailed': {
		"is_gently_used": "Gently Used",
		"is_used": "Used",
		"is_not_specified": "Not Specified",
		"is_new": "New",
		"is_worn": "Worn"
	},
	'flightclub': {
		"new_no_defects": "New",
		"new_with_defects": "New With Defects",
		"used": "Used",
	}
}

export function processStockxData(data) {
	let products = data["Products"];
	let results = [];
	for (const item of products) {
		if (results.length >= 20)
			break;
		results.push({
			"source": "stockx",
			"model": item["title"],
			"sku_id": item["styleId"],
			"size": item["shoeSize"],
			"price": item["market"]["lowestAsk"],
			"shoe_condition": conditionsMap['stockx'][item["condition"]],
			"url": "stockx.com/" + item["urlKey"],
			"image": item["media"]["imageUrl"],
			"image_thumbnail": item["media"]["imageUrl"].split('?')[0] + "?w=300&q=50&trim=color"
		});
	}
	return results;
}

export function processGoatData(data) {
	let products = data['hits'];
	let results = [];
	for (const item of products) {
		if (results.length >= 20)
			break;
		results.push({
			'source': 'goat',
			'model': item['name'],
			'sku_id': item['sku'].replace(' ', '-'),
			'size': item['size'].toString(),
			'price': item['lowest_price_cents']/100,
			'shoe_condition': conditionsMap['goat'][item['shoe_condition']],
			'url': 'goat.com/sneakers/' + item['slug'],
			'image': item['main_picture_url'],
			'image_thumbnail': item['main_picture_url'].substring(0,23) + "300" + item['main_picture_url'].substring(26)
		});
	}
	return results;
}

export function processGrailedData(data) {
	
}

export function processFlightclubData(data) {
	
}