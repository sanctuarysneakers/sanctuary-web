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

	let results = await response.json()
	let itemInfo = extractItemInfo(results, itemKey)
	if (!itemInfo) return null

	return {
		sku: itemInfo['sku'],
		modelName: itemInfo['model'],
		image: itemInfo['image'],
		url: itemInfo['url'], 
		urlKey: itemInfo['urlKey']
	}
}

function extractItemInfo(results, itemKey) {
	for (let x = 0; x < results.length; x++) {

		let resultItem = results[x]
		if (resultItem['sku'].replaceAll('-', ' ') === itemKey || resultItem['sku'] === itemKey || resultItem['sku'].includes(itemKey) || resultItem['urlKey'] === itemKey) {
			return resultItem
		} 

		// handles case where sku contains multiple skus separated by '/'
		let skus = resultItem['sku'].split('/') 

		//when searching by urlkey, the correct item info might not be the first result so need to loop through all
		for (var i=0; i < skus.length; i++) {
			skus[i] = skus[i].replaceAll('-', ' ')
			if (skus[i].includes(itemKey))
				return resultItem
		}
	}

	return null 
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

export async function getRelatedItems(item, currency) {
	let search = item.urlKey
	const request = createRequestObject('related', {
		search, currency
	})

	const response = await fetch(request.url, request.headers)
	if (!response.ok) return []

	let results = await response.json()
	if (!results.length) return []
	results = results.filter(item => 
		!item["model"].includes("(GS)") 
		&& !item["model"].includes("(TD)") 
		&& !item["model"].includes("(PS)"))
	return results
}
