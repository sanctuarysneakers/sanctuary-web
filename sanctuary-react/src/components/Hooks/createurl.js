
export function createStockxURL(search, size, price_low, price_high) {
	let obj = {
		url: 'https://stockx.com/api/browse?' + new URLSearchParams({
			"_search": search,
			"shoeSize": size,
			"market.lowestAsk": `range(${price_low}|${price_high})`,
			"productCategory": "sneakers",
			"gender": "men"
		}),
		headers: {
			method: 'GET',
			headers: {
				"accept": "*/*",
				"appos": "web",
				"appversion": "0.1",
				"origin": "http://stockx.com"
			}
		}
	}
	return obj;
}

export function createGoatURL(search, size, price_low, price_high) {
	let request_obj = {
		url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query?' + new URLSearchParams({
			"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
			"x-algolia-application-id": "2FWOTDVM2O",
			"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
		}),
		headers: {
			method: 'POST',
			body: JSON.stringify({
				"query": search,
				"facetFilters": `(product_category: shoes), (presentation_size: ${size}), (single_gender: men)`,
				"numericFilters": `[\"lowest_price_cents_usd>=${price_low*100}\",\"lowest_price_cents_usd<=${price_high*100}\"]`,
				"distinct": "true"
			})
		}
	}
	return request_obj;
}

export function createGrailedURL() {

}

export function createFlightclubURL() {

}