import createRequestObject from './createRequest'


/********** Lowest Prices **********/

export async function stockxLowestPrice(item, currencyRate) {
	if (!item.hasPrice) return []
	
	return [{
		source: 'stockx',
		price: Math.round(item.price * currencyRate),
		url: new URL(`https://stockx.pvxt.net/c/2588966/1023711/9060?&u=${item.url}`)
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

		let url = new URL(`https://${itemData[0]['url']}`)
		url.searchParams.set('mkcid', '1')
        url.searchParams.set('mkrid', '711-53200-19255-0')
        url.searchParams.set('siteid', '0')
        url.searchParams.set('campid', '5338823385')
        url.searchParams.set('customid', '')
        url.searchParams.set('toolid', '10001')
        url.searchParams.set('mkevt', '1')

		return [{
			source: 'ebay',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: url
		}]
	} catch (e) {
		return []
	}
}


export async function klektLowestPrice(item, size, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName

	const request = createRequestObject('klekt', {search: search, size: size})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()

		let itemData = await response.json()

		return [{
			source: 'klekt',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: new URL(`https://${itemData[0]['url']}`)
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
			url: new URL(`https://goat.com/sneakers/${itemData[0]['slug']}`)
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
			url: new URL(`https://flightclub.com/${itemData[0]['slug']}`)
		}]
	} catch (e) {
		return []
	}
}


/********** Listings **********/

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
			let url = new URL(`https://${item['url']}`)
			url.searchParams.set('mkcid', '1')
			url.searchParams.set('mkrid', '711-53200-19255-0')
			url.searchParams.set('siteid', '0')
			url.searchParams.set('campid', '5338823385')
			url.searchParams.set('customid', '')
			url.searchParams.set('toolid', '10001')
			url.searchParams.set('mkevt', '1')

			results.push({
				id: item['id'],
				source: 'ebay',
				price: Math.round(item['price'] * currencyRate),
				image: item['image'],
				url: url
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
				url: new URL(`https://${item['url']}`)
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
				url: new URL(`https://grailed.com/listings/${item['id'].toString()}`)
			})
		}
		return results
	} catch (e) {
		return []
	}
}
