import createRequestObject from './createrequest'


/**** Lowest Prices (New) ****/

export async function stockxLowestPrice(skuId, modelName, size, currencyRate) {
	let search = skuId
	if (skuId === '') search = modelName

	const request = createRequestObject('stockx', {search: search, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let rawData = await response.json()
		let itemData = rawData["Products"]
		return [{
			source: "stockx",
			price: Math.round(itemData[0]["market"]["lowestAsk"] * currencyRate),
			url: "stockx.com/" + itemData[0]["urlKey"]
		}]
	} catch (e) {
		return []
	}
}


export async function goatLowestPrice(skuId, modelName, size, currencyRate) {
	let search = skuId
	if (skuId === '') search = modelName
	
	const request = createRequestObject('goat', {search: search, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let rawData = await response.json()
		let itemData = rawData['hits']
		return [{
			source: "goat",
			price: Math.round((itemData[0]['lowest_price_cents']/100) * currencyRate),
			url: 'goat.com/sneakers/' + itemData[0]['slug']
		}]
	} catch (e) {
		return []
	}
}


export async function flightclubLowestPrice(skuId, modelName, size, currencyRate) {
	let search = skuId
	if (skuId === '') search = modelName
	
	const request = createRequestObject('flightclub', {search: search, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let rawData = await response.json()
		let itemData = rawData['hits']
		return [{
			source: "flightclub",
			price: Math.round((itemData[0]['lowest_price_cents']/100) * currencyRate),
			url: 'flightclub.com/' + itemData[0]['slug']
		}]
	} catch (e) {
		return []
	}
}


export async function klektLowestPrice(skuId, modelName, size, currencyRate) {
	let search = skuId
	if (skuId === '') search = modelName

	// request1: get product id for sneaker model
	const request1 = createRequestObject('klekt1', { search: search })
	try {
		const response1 = await fetch(request1.url, request1.headers)
		if (!response1.ok) throw new Error()

		let rawData1 = await response1.json()
		let item = rawData1["data"]["search"]["items"][0]

		// request2: get price based on product id
		const request2 = createRequestObject('klekt2', { pid: item["productId"] })
		const response2 = await fetch(request2.url, request2.headers)
		if (!response2.ok) throw new Error()

		let rawData2 = await response2.json()
		let productVariants = rawData2["data"]["productDetails"]["variants"]

		// find the correct size from productVariants
		for (const variant of productVariants) {
			const vSize = variant["facetValues"][0]["code"].replace("us", "")
			if (parseFloat(vSize) == parseFloat(size)) {
				return [{
					source: 'klekt',
					price: variant["priceWithTax"]/100 * currencyRate,  /// PRICE IN EUROS ///
					url: "klekt.com/product/" + rawData2["data"]["productDetails"]["slug"]
				}]
			}
		}
	} catch (e) {
		return []
	}
}


export async function ebayLowestPrice(skuId, modelName, size, location, currencyRate) {
	let search = modelName.concat(' ', skuId)

	const request = createRequestObject('ebay', {search: search, size: size, shipTo: location})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()
		return [{
			source: "ebay",
			price: itemData[0]['price'] * currencyRate,
			url: itemData[0]['url']
		}]
	} catch (e) {
		return []
	}
}


/**** Listings (New/Used) ****/

export async function ebayListings(skuId, modelName, size, location) {
	let search = modelName.concat(' ', skuId)
	
	const request = createRequestObject('ebayListings', {search: search, size: size, shipTo: location})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()
		return itemData
	} catch (e) {
		return []
	}
}


export async function depopListings(modelName, size) {
	const request = createRequestObject('depopListings', {search: modelName, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()
		return itemData
	} catch (e) {
		return []
	}
}


export async function grailedListings(modelName, size, maxItems=5, currencyRate) {
	const request = createRequestObject('grailedListings', {search: modelName, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()
		
		let rawData = await response.json()
		let itemData = rawData["results"][0]["hits"]
		let results = []
		for (const item of itemData) {
			if (results.length >= maxItems) break
			results.push({
				source: "grailed",
				price: Math.round((item['price']) * currencyRate),
				image: item['cover_photo']['url'],
				url: "grailed.com/listings/" + item['id'].toString()
			})
		}
		return results
	} catch (e) {
		return []
	}
}

