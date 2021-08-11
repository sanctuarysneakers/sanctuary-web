import createRequestObject from './createRequest'


/**** Lowest Prices ****/

export async function stockxLowestPrice(item, currencyRate) {
	if (!item.hasPrice) return []
	
	return [{
		source: 'stockx',
		price: Math.round(item.price * currencyRate),
		url: `stockx.pvxt.net/c/2588966/1023711/9060?&u=${item.url}`
	}]
}


export async function ebayLowestPrice(item, size, location, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.modelName.concat(' ', item.skuId)

	const request = createRequestObject('ebay', {search: search, size: size, shipTo: location})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()
		return [{
			source: 'ebay',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: itemData[0]['url']
		}]
	} catch (e) {
		return []
	}
}


export async function goatLowestPrice(item, size, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName
	
	const request = createRequestObject('goat', {search: search, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let rawData = await response.json()
		let itemData = rawData['hits']
		return [{
			source: 'goat',
			price: Math.round((itemData[0]['lowest_price_cents']/100) * currencyRate),
			url: 'goat.com/sneakers/' + itemData[0]['slug']
		}]
	} catch (e) {
		return []
	}
}


export async function flightclubLowestPrice(item, size, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName
	
	const request = createRequestObject('flightclub', {search: search, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let rawData = await response.json()
		let itemData = rawData['hits']
		return [{
			source: 'flightclub',
			price: Math.round((itemData[0]['lowest_price_cents']/100) * currencyRate),
			url: 'flightclub.com/' + itemData[0]['slug']
		}]
	} catch (e) {
		return []
	}
}


export async function klektLowestPrice(item, size, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName

	// request1: get product id for sneaker model
	const request1 = createRequestObject('klekt1', { search: search })
	try {
		const response1 = await fetch(request1.url, request1.headers)
		if (!response1.ok) throw new Error()

		let rawData1 = await response1.json()
		let item = rawData1['data']['search']['items'][0]

		// request2: get price based on product id
		const request2 = createRequestObject('klekt2', { pid: item['productId'] })
		const response2 = await fetch(request2.url, request2.headers)
		if (!response2.ok) throw new Error()

		let rawData2 = await response2.json()
		let productVariants = rawData2['data']['productDetails']['variants']

		// find the correct size from productVariants
		let result = []
		for (const variant of productVariants) {
			const vSize = variant['facetValues'][0]['code'].replace('us', '')
			if (parseFloat(vSize) === parseFloat(size)) {
				result.push({
					source: 'klekt',
					price: Math.round(variant['priceWithTax']/100 * currencyRate),  /// PRICE IN EUROS ///
					url: 'klekt.com/product/' + rawData2['data']['productDetails']['slug']
				})
			}
		}
		return result
	} catch (e) {
		return []
	}
}


/**** Listings ****/

export async function ebayListings(item, size, location, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.modelName.concat(' ', item.skuId)
	
	const request = createRequestObject('ebayListings', {search: search, size: size, shipTo: location})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {
			results.push({
				id: item['id'],
				source: 'ebay',
				price: Math.round(item['price'] * currencyRate),
				image: item['image'],
				url: item['url']
			})
		}
		return results
	} catch (e) {
		return []
	}
}


export async function depopListings(item, size, currencyRate) {
	if (!item.hasPrice) return []

	const request = createRequestObject('depopListings', {search: item.modelName, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {
			results.push({
				id: item['id'],
				source: 'depop',
				price: Math.round(item['price'] * currencyRate),
				image: item['image'],
				url: item['url']
			})
		}
		return results
	} catch (e) {
		return []
	}
}


export async function grailedListings(item, size, currencyRate) {
	if (!item.hasPrice) return []

	let maxItems = 7
	const request = createRequestObject('grailedListings', {search: item.modelName, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()
		
		let rawData = await response.json()
		let itemData = rawData['results'][0]['hits']
		let results = []
		for (const item of itemData) {
			if (results.length >= maxItems) break
			results.push({
				id: item['id'],
				source: 'grailed',
				price: Math.round((item['price']) * currencyRate),
				image: item['cover_photo']['url'],
				url: 'grailed.com/listings/' + item['id'].toString()
			})
		}
		return results
	} catch (e) {
		return []
	}
}
