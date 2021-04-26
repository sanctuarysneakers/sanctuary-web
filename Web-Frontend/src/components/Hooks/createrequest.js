
export default function createRequestObject(type, filter) {
	switch (type) {
		case 'browse':
			return {
				url: 'https://stockx.com/api/browse?' + new URLSearchParams({
					"_search": filter.search,
					"productCategory": "sneakers",
					"gender": "men"
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'stockx':
			return {
				url: 'https://stockx.com/api/browse?' + new URLSearchParams({
					"_search": filter.search,
					"shoeSize": filter.size,
					"market.lowestAsk": `range(${filter.price_low}|${filter.price_high})`,
					"productCategory": "sneakers",
					"gender": "men"
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'goat':
			return {
				url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
					"x-algolia-application-id": "2FWOTDVM2O",
					"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"query": filter.search,
						"facetFilters": `(product_category: shoes), (presentation_size: ${filter.size}), (single_gender: men)`,
						"numericFilters": `[\"lowest_price_cents_usd>=${filter.price_low*100}\",\"lowest_price_cents_usd<=${filter.price_high*100}\"]`,
						"distinct": "true"
					})
				}
			}
		case 'grailed':
			return {
				url: 'https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
					"x-algolia-application-id": "MNRWEFSS2Q",
					"x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"requests": [{
							"indexName": "Listing_by_heat_production",
							"params": new URLSearchParams({
								"query": filter.search,
								"facetFilters": `[[\"category_size:footwear.${filter.size}\"], [\"category_path:footwear.hitop_sneakers\", \"category_path:footwear.lowtop_sneakers\"]]`,
								"numericFilters": `[\"price_i>=${filter.price_low}\",\"price_i<=${filter.price_high}\"]`,
							}).toString()
						}]
					})
				}
			}
		case 'flightclub':
			return {
				url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
					"x-algolia-application-id": "2FWOTDVM2O",
					"x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"query": filter.search,
						"facetFilters": `[["size_us_men:${filter.size}"]]`,
						"numericFilters": `[\"lowest_price_cents_usd>=${filter.price_low*100}\",\"lowest_price_cents_usd<=${filter.price_high*100}\"]`,
						"distinct": "true",
					})
				}
			}
	}
}