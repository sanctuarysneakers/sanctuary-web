import createRequestObject from './createRequest'


export async function stockxLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	let search = item.skuId !== '' ? item.skuId : item.modelName.replace('(W)', '')
	const request = createRequestObject('stockx', {
		search: search, 
		size: filter.gender === 'women' ? filter.size-1.5 : filter.size,
		currency: filter.currency,
		ship_to: filter.country
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		
		return [{
			source: 'stockx',
			price: Math.round(itemData[0]['price2']),
			url: new URL(itemData[0]['url']),
			shippingPrice: Math.round(itemData[0]['shipping2'])
		}]
	} catch (e) {
		return []
	}
}


export async function ebayLowestPrice(item, filter) {
	if (!item.hasPrice) return []

	let search = item.modelName.replace('(W)', '').concat(' ', item.skuId)
	let request = createRequestObject('ebay', {
		search: search, 
		size: filter.size, 
		currency: filter.currency,
		ship_to: filter.country, 
		postal_code: filter.postalCode
	})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		itemData.sort((a, b) => a.price - b.price)

		return [{
			source: 'ebay',
			price: Math.round(itemData[0]['price2']),
			url: new URL(itemData[0]['url']),
			shippingPrice: Math.round(itemData[0]['shipping2'])
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
		currency: filter.currency,
		ship_to: filter.country
	})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()

		return [{
			source: 'klekt',
			price: Math.round(itemData[0]['price2']),
			url: new URL(itemData[0]['url']),
			shippingPrice: Math.round(itemData[0]['shipping2'])
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
		currency: filter.currency,
		ship_to: filter.country
	})
	
	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		
		return [{
			source: 'goat',
			price: Math.round(itemData[0]['price2']),
			url: new URL(itemData[0]['url']),
			shippingPrice: Math.round(itemData[0]['shipping2'])
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
		currency: filter.currency,
		ship_to: filter.country
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		
		return [{
			source: 'flightclub',
			price: Math.round(itemData[0]['price2']),
			url: new URL(itemData[0]['url']),
			shippingPrice: Math.round(itemData[0]['shipping2'])
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
		currency: filter.currency,
		ship_to: filter.country, 
		postal_code: filter.postalCode
	})

	try {
		const response = await fetch(request.url, request.headers)
		if (!response.ok) return []

		let itemData = await response.json()
		let results = []
		for (const item of itemData) {

			results.push({
				id: item['id'],
				source: 'ebay',
				price: Math.round(item['price2']),
				image: item['image'],
				url: item['url'],
				condition: item['condition'],
				shippingPrice: Math.round(item['shipping2'])
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
		currency: filter.currency,
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
				price: Math.round(item['price2']),
				image: item['image'],
				url: new URL(item['url']),
				shippingPrice: Math.round(item['shipping2'])
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
		currency: filter.currency,
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
				price: Math.round(item['price2']),
				image: item['image'],
				url: new URL(item['url']),
				shippingPrice: Math.round(item['shipping2'])
			}
			results.push(itemResult)
		}
		return results
	} catch (e) {
		return []
	}
}
