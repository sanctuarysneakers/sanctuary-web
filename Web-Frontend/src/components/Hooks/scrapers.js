import createRequestObject from './createrequest'


export async function stockxLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('stockx', {
		search: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData["Products"]

	if (itemData.length == 0) return null
	return {
		source: "stockx",
		price: Math.round(itemData[0]["market"]["lowestAsk"]),
		url: "stockx.com/" + itemData[0]["urlKey"]
	}
}


export async function goatLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('goat', {
		search: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData['hits']

	if (itemData.length == 0) return null
	return {
		source: "goat",
		price: Math.round(itemData[0]['lowest_price_cents']/100),
		url: 'goat.com/sneakers/' + itemData[0]['slug']
	}
}


export async function flightclubLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('flightclub', {
		search: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData['hits']

	if (itemData.length == 0) return null
	return {
		source: "flightclub",
		price: Math.round(itemData[0]['lowest_price_cents']/100),
		url: 'flightclub.com/' + itemData[0]['slug']
	}
}


export async function grailedLowestPrice(modelName, size, currencyRate) {
	const request = createRequestObject('grailed', {
		search: modelName, size: size
	})
	const response = await fetch(request.url, request.headers)
	let rawData = await response.json()
	let itemData = rawData["results"][0]["hits"]

	if (itemData.length == 0) return null
	return {
		source: "grailed",
		price: Math.round(itemData[0]['price']),
		url: "grailed.com/listings/" + itemData[0]['id'].toString()
	}
}


export async function klektLowestPrice(skuId, size, currencyRate) {
	// request1: get product id for sneaker model
	const request1 = createRequestObject('klekt1', { search: skuId })
	const response1 = await fetch(request1.url, request1.headers)
	let rawData1 = await response1.json()
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


export async function ebayLowestPrice(skuId, modelName, size, location='US', currencyRate) {
	const request = createRequestObject('ebay', {
		sku: skuId, model: modelName, size: size, shipTo: location
	})
	const response = await fetch(request.url, request.headers)
	let itemData = await response.json()

	if (itemData.length == 0) return null
	return {
		source: "ebay",
		price: itemData[0]['price'],
		url: itemData[0]['url']
	}
}


export async function depopLowestPrice(modelName, size, currencyRate) {
	const request = createRequestObject('depop', {
		model: modelName, size: size
	})
	const response = await fetch(request.url, request.headers)
	let itemData = await response.json()

	if (itemData.length == 0) return null
	return {
		source: "depop",
		price: itemData[0]['price'],
		url: itemData[0]['url']
	}
}


export async function sneakerconLowestPrice(skuId, size, currencyRate) {
	const request = createRequestObject('sneakercon', {
		sku: skuId, size: size
	})
	const response = await fetch(request.url, request.headers)
	let itemData = await response.json()

	if (itemData.length == 0) return null
	return {
		source: "sneakercon",
		price: itemData[0]['price'],
		url: itemData[0]['url']
	}
}

