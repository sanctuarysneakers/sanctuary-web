import createRequestObject from './createRequest'


async function currencyConversionRate(from, to) {
	const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/currencyrate2?from_curr=${from}&to_curr=${to}`
	const response = await fetch(url)
	return await response.json()
}


export async function stockxLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	// TODO: move shipping currency conversion logic to backend
	const shippingInfo = item.shipping
	const shippingConversionRate = await currencyConversionRate(shippingInfo['currency'], filter.currency)
	let shippingPrice = shippingInfo['cost'] * shippingConversionRate

	return [{
		source: 'stockx',
		price: Math.round(item.price * filter.usdRate),
		url: new URL(item.url),
		shippingPrice: shippingPrice
	}]
}


export async function ebayLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '').concat(' ', item.skuId)
	let request = createRequestObject('ebay', {
		search: search, 
		size: filter.size, 
		ship_to: filter.country, 
		postal_code: filter.postalCode
	})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		itemData.sort((a, b) => a.price - b.price)

		// TODO: move shipping currency conversion logic to backend
		let shipping = null
		if (itemData[0]['shipping']) {
			// TODO: use real currency rate instead of usdRate
			if (filter.currency !== itemData[0]['shipping']['@currencyId']) 
				shipping = Math.round(itemData[0]['shipping']['__value__'] * filter.usdRate)
			else
				shipping = Math.round(itemData[0]['shipping']['__value__'])
		}

		return [{
			source: 'ebay',
			price: Math.round(itemData[0]['price'] * filter.usdRate),
			url: new URL(itemData[0]['url']),
			shippingPrice: shipping
		}]
	} catch (e) {
		return []
	}
}


export async function klektLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')
	const request = createRequestObject('klekt', {
		search: search, 
		size: filter.size,
		ship_to: filter.country
	})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()

		// TODO: move shipping currency conversion logic to backend
		const shippingInfo = itemData[0]['shipping']
		const shippingConversionRate = await currencyConversionRate(shippingInfo['currency'], filter.currency)
		let shippingPrice = shippingInfo['cost'] * shippingConversionRate

		return [{
			source: 'klekt',
			price: Math.round(itemData[0]['price'] * filter.eurRate),
			url: new URL(itemData[0]['url']),
			shippingPrice: shippingPrice
		}]
	} catch (e) {
		return []
	}
}


export async function goatLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')
	const request = createRequestObject('goat', {
		search: search, 
		size: filter.size,
		ship_to: filter.country
	})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()

		// TODO: move shipping currency conversion logic to backend
		const shippingInfo = itemData[0]['shipping']
		const shippingConversionRate = await currencyConversionRate(shippingInfo['currency'], filter.currency)
		let shippingPrice = shippingInfo['cost'] * shippingConversionRate
		
		return [{
			source: 'goat',
			price: Math.round(itemData[0]['price'] * filter.usdRate),
			url: new URL(itemData[0]['url']),
			shippingPrice: shippingPrice
		}]
	} catch (e) {
		return []
	}
}


export async function flightclubLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')
	const request = createRequestObject('flightclub', {
		search: search, 
		size: filter.gender === 'women' ? filter.size-1.5 : filter.size,
		ship_to: filter.country
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()

		// TODO: move shipping currency conversion logic to backend
		const shippingInfo = itemData[0]['shipping']
		const shippingConversionRate = await currencyConversionRate(shippingInfo['currency'], filter.currency)
		let shippingPrice = shippingInfo['cost'] * shippingConversionRate
		
		return [{
			source: 'flightclub',
			price: Math.round(itemData[0]['price'] * filter.usdRate),
			url: new URL(itemData[0]['url']),
			shippingPrice: shippingPrice
		}]
	} catch (e) {
		return []
	}
}


export async function ebayListings(item, filter) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '').concat(' ', item.skuId)
	const request = createRequestObject('ebay', {
		search: search, 
		size: filter.size, 
		ship_to: filter.country, 
		postal_code: filter.postalCode
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {

			// TODO: move shipping currency conversion logic to backend
			let shipping = null
			if (item['shipping']) {
				if (filter.currency !== item['shipping']['@currencyId']) 
					shipping = Math.round(item['shipping']['__value__'] * filter.usdRate)
				else 
					shipping = Math.round(item['shipping']['__value__'])
			}

			results.push({
				id: item['id'],
				source: 'ebay',
				price: Math.round(item['price'] * filter.usdRate),
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


export async function depopListings(item, filter) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '')
	const request = createRequestObject('depop', {
		search: search, 
		size: filter.size, 
		gender: filter.gender, 
		ship_to: filter.country
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {
			results.push({
				id: item['id'],
				source: 'depop',
				price: Math.round(item['price'] * filter.usdRate),
				image: item['image'],
				url: new URL(item['url']),
				shippingPrice: Math.round(item['shipping'] * filter.usdRate)
			})
		}
		return results
	} catch (e) {
		return []
	}
}

export async function grailedListings(item, filter) {
	if (!item.hasPrice) return []
	
	let search = item.modelName.replace('(W)', '')
	const request = createRequestObject('grailed', {
		search: search, 
		size: filter.size, 
		ship_to: filter.country
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []
		
		let itemData = await response.json()

		let results = []
		for (const item of itemData) {
			let itemResult = {
				id: item['id'],
				source: 'grailed',
				price: Math.round(item['price'] * filter.usdRate),
				image: item['image'],
				url: new URL(item['url']),
				shippingPrice: item['shipping'] ? Math.round(item['shipping'] * filter.usdRate) : null
			}
			results.push(itemResult)
		}
		return results
	} catch (e) {
		return []
	}
}
