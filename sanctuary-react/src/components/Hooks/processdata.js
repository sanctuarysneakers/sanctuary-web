
const getProducts = (data, site) => {
	switch (site) {
		case 'stockx':
			return data["Products"];
		case 'goat':
			return data['hits'];
		case 'grailed':
			return data["results"][0]["hits"];
		case 'flightclub':
			return data['hits'];
	}
}

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

const processItem = (item, site, currencyRate) => {
	switch (site) {
		case 'stockx':
			return {
				"source": "stockx",
				"model": item["title"],
				"sku_id": item["styleId"],
				"size": item["shoeSize"],
				"price": Math.round(item["market"]["lowestAsk"] * currencyRate),
				"shoe_condition": conditionsMap['stockx'][item["condition"]],
				"url": "stockx.com/" + item["urlKey"],
				"image": item["media"]["imageUrl"],
				"image_thumbnail": item["media"]["imageUrl"].split('?')[0] + "?w=300&q=50&trim=color"
			};
		case 'goat':
			return {
				'source': 'goat',
				'model': item['name'],
				'sku_id': item['sku'].replace(' ', '-'),
				'size': item['size'].toString(),
				'price': Math.round((item['lowest_price_cents']/100) * currencyRate),
				'shoe_condition': conditionsMap['goat'][item['shoe_condition']],
				'url': 'goat.com/sneakers/' + item['slug'],
				'image': item['main_picture_url'],
				'image_thumbnail': item['main_picture_url'].substring(0,23) + "300" + item['main_picture_url'].substring(26)
			};
		case 'grailed':
			return {
				"source": 'grailed',
				"model": item['title'],
				"size": item['size'],
				"price": Math.round(item['price'] * currencyRate),
				"shoe_condition": conditionsMap['grailed'][item['condition']],
				"url": "grailed.com/listings/" + item['id'].toString(),
				"image": item['cover_photo']['url'],
				"image_thumbnail": "https://process.fs.grailed.com/auto_image/resize=width:320/output=quality:80/compress/" + item['cover_photo']['url'],
			}
		case 'flightclub':
			return {
				'source': 'flightclub',
				'model': item['name'],
				'sku_id': item['sku'].replace(' ', '-'),
				'size': item['size'].toString(),
				'price': Math.round((item['lowest_price_cents']/100) * currencyRate),
				'shoe_condition': conditionsMap['flightclub'][item['shoe_condition']],
				'url': 'flightclub.com/' + item['slug'],
				'image': item['main_picture_url'],
				'image_thumbnail': item['main_picture_url'].substring(0,27) + "400" + item['main_picture_url'].substring(26)
			};
	}
}

export default function processData(data, site, limit, currencyRate) {
	let results = [];
	let products = getProducts(data, site);
	for (const item of products) {
		if (results.length >= limit)
			break
		
		let processedItem = processItem(item, site, currencyRate);
		if (processedItem['price'] == 0)
			continue
		results.push(processedItem);
	}
	return results;
}