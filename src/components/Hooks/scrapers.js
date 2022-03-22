import createRequestObject from './createRequest'

/********** Lowest Prices **********/

export async function stockxLowestPrice(item, currencyRate) {
	if (!item.hasPrice) return []
	
	return [{
		source: 'stockx',
		price: Math.round(item.price * currencyRate),
		url: new URL(item.url)
	}]
}


export async function ebayLowestPrice(item, size, country, postalCode, currencyRate, currency) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '').concat(' ', item.skuId)
	let request
	if (postalCode !== '')
		request = createRequestObject('ebay', {search: search, size: size, shipTo: country, postalCode: postalCode})
	else 
		request = createRequestObject('ebay', {search: search, size: size, shipTo: country})
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

		let finalData = {
			source: 'ebay',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: url
		}
		if ('shippingInfo' in itemData[0]) {
			if (currency !== itemData[0]['shippingInfo'][0]['shippingServiceCost']['@currencyId']) 
				finalData['shippingPrice'] = Math.round(itemData[0]['shippingInfo'][0]['shippingServiceCost'][0]['__value__'] * currencyRate)
			else 
				finalData['shippingPrice'] = Math.round(itemData[0]['shippingInfo'][0]['shippingServiceCost'][0]['__value__'])
		}
		return [finalData]
	} catch (e) {
		return []
	}
}


export async function klektLowestPrice(item, size, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')

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

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')
	
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


export async function flightclubLowestPrice(item, size, gender, currencyRate) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')
	if (gender === 'women') size -= 1.5
	
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

export async function ebayListings(item, size, location, currencyRate, currency, postalCode) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '').concat(' ', item.skuId)
	
	const request = createRequestObject('ebayListings', {search: search, size: size, shipTo: location, postalCode: postalCode})
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
				url: url,
				condition:  item['condition']
			})

			if ('shippingInfo' in item) {
				if (currency !== item['shippingInfo']['@currencyId'])
					results[results.length - 1]['shippingPrice'] = Math.round(item['shippingInfo']['__value__'] * currencyRate)
				else {
					results[results.length - 1]['shippingPrice'] = Math.round(item['shippingInfo']['__value__'])}
			}
		}
		return results
	} catch (e) {
		return []
	}
}


export async function depopListings(item, size, gender, currencyRate, location) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '')
	const request = createRequestObject('depopListings', {search: search, size: size, gender: gender, shipTo: location})
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
			if (location !== 'US')
				results[results.length - 1]['shippingPrice'] = Math.round(item['internationalShippingCost'] * currencyRate)
			else
				results[results.length - 1]['shippingPrice'] = Math.round(item['nationalShipping'] * currencyRate)

		}
		return results
	} catch (e) {
		return []
	}
}

export async function grailedListings(item, size, currencyRate, country) {
	if (!item.hasPrice) return []
	
	let maxItems = 7
	let search = item.modelName.replace('(W)', '')
	const request = createRequestObject('grailedListings', {search: search, size: size})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) throw new Error()
		
		let rawData = await response.json()
		let itemData = rawData['results'][0]['hits']
		let results = []
		for (const item of itemData) {
			if (results.length >= maxItems) break
			let itemResult = {
				id: item['id'],
				source: 'grailed',
				price: Math.round((item['price']) * currencyRate),
				image: item['cover_photo']['url'],
				url: new URL(`https://grailed.com/listings/${item['id'].toString()}`)		
			}
			if (country in item['shipping']) {
				if (item['shipping'][country]['enabled'])
					itemResult['shippingPrice'] = Math.round(item['shipping'][country]['amount'] * currencyRate)
			}
			else {
				if (item['shipping']['other']['enabled'])
					itemResult['shippingPrice'] = Math.round(item['shipping']['other']['amount'] * currencyRate)
			}
			results.push(itemResult)
		}
		return results
	} catch (e) {
		return []
	}
}
