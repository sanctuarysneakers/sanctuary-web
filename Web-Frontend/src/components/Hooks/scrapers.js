import createRequestObject from './createrequest'


async function stockxLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('stockx', {
		search: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData["Products"]

	if (itemData.length == 0) return null
	return {
		source: "stockx",
		price: Math.round(item["market"]["lowestAsk"] * currencyRate),
		url: "stockx.com/" + itemData[0]["urlKey"]
	}
}


async function goatLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('goat', {
		search: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData['hits']

	if (itemData.length == 0) return null
	return {
		source: "goat",
		price: Math.round((itemData[0]['lowest_price_cents']/100) * currencyRate),
		url: 'goat.com/sneakers/' + itemData[0]['slug']
	}
}


async function flightclubLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('flightclub', {
		search: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData['hits']

	if (itemData.length == 0) return null
	return {
		source: "flightclub",
		price: Math.round((itemData[0]['lowest_price_cents']/100) * currencyRate),
		url: 'flightclub.com/' + itemData[0]['slug']
	}
}


async function grailedLowestPrice(modelName, size, currencyRate) {
	const request = createRequestObject('grailed', {
		search: modelName, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData["results"][0]["hits"]

	if (itemData.length == 0) return null
	return {
		source: "grailed",
		price: Math.round(itemData[0]['price'] * currencyRate),
		url: "grailed.com/listings/" + str(itemData[0]['id'])
	}
}


async function ebayLowestPrice(skuId, size, location, currencyRate) {
	const request = createRequestObject('ebay', {
		search: skuId, size: size, shipTo: location
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData['findItemsAdvancedResponse'][0]['searchResult'][0]['item']

	if (itemData.length == 0) return null
	return {
		source: "ebay",
		price: Math.round(parseFloat(itemData[0]['sellingStatus'][0]['currentPrice'][0]['__value__']) * currencyRate),
		url: itemData[0]['viewItemURL'][0]
	}
}


async function depopLowestPrice(modelName, size, currencyRate) {
	const request = createRequestObject('depop', {
		search: modelName, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData["products"]

	if (itemData.length == 0) return null
	return {
		source: "depop",
		price: Math.round(parseFloat(itemData[0]["price"]["priceAmount"] * currencyRate)),
		url: "depop.com/products/" + itemData[0]["slug"]
	}
}


async function klektLowestPrice(skuId, size, currencyRate) {
	// request1: get product id for sneaker model
	const request1 = createRequestObject('klekt1', { search: skuId })
	const response1 = await fetch(request1.url, request1.headers)
	let rawData1 = await response1.json()
	if (!rawData1.length) return null
	let item = rawData1["data"]["search"]["items"][0]

	// request2: get price based on product id
	const request2 = createRequestObject('klekt2', { pid: item["productId"] })
	const response2 = await fetch(request2.url, request2.headers)
	let rawData2 = await response2.json()
	let productVariants = rawData2["data"]["productDetails"]["variants"]

	// find the correct size from productVariants
	for (const variant of productVariants) {
		const vSize = variant["facetValues"][0]["code"].replace("us", "")
		if (parseFloat(vSize) == parseFloat(size)) {
			return {
				source: 'klekt',
				price: variant["priceWithTax"]/100,  /// PRICE IN EUROS ///
				url: "klekt.com/product/" + rawData2["data"]["productDetails"]["slug"]
			}
		}
	}
	return null
}


async function sneakerconLowestPrice(skuId, size, currencyRate) {
	// request1: get item data for sneaker model
	const request1 = createRequestObject('sneakercon1', {
		search: skuId, size: size
	})
	const response1 = await fetch(request1.url, request1.headers)
	let rawData1 = await response1.json()
	if (rawData1.length == 0) return null
	let item = rawData1[0]

	// request2: get price based on item id
	const request2 = createRequestObject('sneakercon2', { pid: item['id'] })
	const response2 = await fetch(request2.url, request2.headers)
	let rawData2 = await response2.json()
	let itemPrice = null
	for (const product of rawData2) {
		if (product['size'] == size.toString())
			itemPrice = product['salePrice']
	}

	if (itemPrice == null) return null
	return {
		source: 'sneakercon',
		price: itemPrice * currencyRate,
		url: "sneakercon.com/product/" + item['id'].toString() + '-' + item['nickname'].replace(' ', '-')
	}
}

