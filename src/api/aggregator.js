import createRequestObject from './createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './dataSources'
import { SafePromiseAll } from './helpers'

export async function getItemInfo(itemKey, gender) {
	const request = createRequestObject('browse', {
		search: itemKey,
		gender: gender
	})

	const response = await fetch(request.url, request.headers)
	if (!response.ok) return null

	let itemData = await response.json()
	
	// handles case where sku contains multiple skus separated by '/'
	let skus = itemData[0]['sku'].split('/')
	let containsSku = false
	for (var i=0; i < skus.length; i++) {
		skus[i] = skus[i].replaceAll('-', ' ')
		if (skus[i].includes(itemKey))
			containsSku = true
	}
	if (!containsSku && !itemData[0]['urlKey'].includes(itemKey))
		return null
	
	return {
		sku: skus.length === 1 ? skus[0] : "",
		modelName: itemData[0]['model'],
		image: itemData[0]['image'],
		url: itemData[0]['url']
	}
}

export async function getItemPrices(item, size, gender, currency, location) {
	let filter = {
		size: size,
		gender: gender,
		country: location['country_code'],
		postalCode: location['postal_code'],
		currency: currency
	}
  
	const res = await SafePromiseAll([
		stockxLowestPrice(item, filter),
		ebayLowestPrice(item, filter),
		flightclubLowestPrice(item, filter),
		goatLowestPrice(item, filter),
		klektLowestPrice(item, filter)
	])
	
	let results = res.flat()
	results = results.filter(r => r.price !== 0)
	results.sort((a, b) => a.price - b.price)
	return results
}

export async function getItemListings(item, size, gender, currency, location) {
	let filter = {
		size: size,
		gender: gender,
		country: location['country_code'],
		postalCode: location['postal_code'],
		currency: currency
	}

	const res = await SafePromiseAll([
		ebayListings(item, filter), 
		depopListings(item, filter),
		grailedListings(item, filter)
	])

	let results = res.flat().sort((a, b) => a.price - b.price)
	return results
}
