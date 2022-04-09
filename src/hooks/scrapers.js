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
	let request = createRequestObject('ebay', {search: search, size: size, shipTo: country, postalCode: postalCode})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		itemData.sort((a, b) => a.price - b.price)

		// TODO: move shipping currency conversion logic to backend
		let shipping = null
		if (itemData[0]['shipping']) {
			if (currency !== itemData[0]['shipping']['@currencyId']) 
				shipping = Math.round(itemData[0]['shipping']['__value__'] * currencyRate)
			else 
				shipping = Math.round(itemData[0]['shipping']['__value__'])
		}

		return [{
			source: 'ebay',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: new URL(itemData[0]['url']),
			shippingPrice: shipping
		}]
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
		if (!response.ok) return []

		let itemData = await response.json()

		return [{
			source: 'klekt',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: new URL(itemData[0]['url'])
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
		if (!response.ok) return []

		let itemData = await response.json()
		
		return [{
			source: 'goat',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: new URL(itemData[0]['url'])
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
		if (!response.ok) return []

		let itemData = await response.json()
		
		return [{
			source: 'flightclub',
			price: Math.round(itemData[0]['price'] * currencyRate),
			url: new URL(itemData[0]['url'])
		}]
	} catch (e) {
		return []
	}
}


export async function ebayListings(item, size, country, currencyRate, currency, postalCode) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '').concat(' ', item.skuId)
	const request = createRequestObject('ebay', {search: search, size: size, shipTo: country, postalCode: postalCode})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {

			// TODO: move shipping currency conversion logic to backend
			let shipping = null
			if (item['shipping']) {
				if (currency !== item['shipping']['@currencyId']) 
					shipping = Math.round(item['shipping']['__value__'] * currencyRate)
				else 
					shipping = Math.round(item['shipping']['__value__'])
			}

			results.push({
				id: item['id'],
				source: 'ebay',
				price: Math.round(item['price'] * currencyRate),
				image: item['image'],
				url: item['url'],
				condition: item['condition'],
				shippingPrice: shipping
			})
		}
		return results
	} catch (e) {
		return []
	}
}


export async function depopListings(item, size, gender, currencyRate, country) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '')
	const request = createRequestObject('depopListings', {search: search, size: size, gender: gender, shipTo: country})
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {
			results.push({
				id: item['id'],
				source: 'depop',
				price: Math.round(item['price'] * currencyRate),
				image: item['image'],
				url: new URL(item['url']),
				shippingPrice: Math.round(item['shipping'] * currencyRate)
			})
		}
		return results
	} catch (e) {
		return []
	}
}

export async function grailedListings(item, size, currencyRate, country) {
	if (!item.hasPrice) return []
	
	let search = item.modelName.replace('(W)', '')
	const request = createRequestObject('grailedListings', {search: search, size: size, shipTo: country})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []
		
		let itemData = await response.json()

		let results = []
		for (const item of itemData) {
			let itemResult = {
				id: item['id'],
				source: 'grailed',
				price: Math.round(item['price'] * currencyRate),
				image: item['image'],
				url: new URL(item['url']),
				shippingPrice: item['shipping'] ? Math.round(item['shipping'] * currencyRate) : null
			}
			results.push(itemResult)
		}
		return results
	} catch (e) {
		return []
	}
}
