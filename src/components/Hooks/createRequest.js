
export default function createRequestObject(type, filter) {
	switch (type) {
		case 'browse':
			return {
				url: 'https://sanctuaryapi.net/browse?' + new URLSearchParams({
					"search": filter.search
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'stockx':
			return {
				url: 'https://sanctuaryapi.net/lowestprice?' + new URLSearchParams({
					"source": "stockx",
					"search": filter.search,
					"size": filter.size
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'ebay':
			return {
				url: 'https://sanctuaryapi.net/lowestprice?' + new URLSearchParams({
					'source': 'ebay',
					'search': filter.search,
					'size': filter.size,
					'ship_to': filter.shipTo
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'goat':
			return {
				url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
					"x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"query": filter.search,
						"facetFilters": `(product_category: shoes), (presentation_size: ${filter.size}), (single_gender: men), (shoe_condition:new_no_defects)`,
					})
				}
			}
		case 'flightclub':
			return {
				url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_flight_club/query?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.32.0;react-instantsearch 5.4.0;JS Helper 2.26.1",
					"x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"query": filter.search,
						"facetFilters": `[["size_us_men:${filter.size}"],["shoe_condition:new_no_defects"]]`,
					})
				}
			}
		case 'ebayListings':
			return {
				url: 'https://sanctuaryapi.net/itemlistings?' + new URLSearchParams({
					'source': 'ebay',
					'search': filter.search,
					'size': filter.size,
					'ship_to': filter.shipTo
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'grailedListings':
			return {
				url: 'https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
					"x-algolia-application-id": "MNRWEFSS2Q", "x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"requests": [{
							"indexName": "Listing_production",
							"params": new URLSearchParams({
								"query": filter.search,
								"facetFilters": `[["category_size:footwear.${filter.size}"]]`,
							}).toString()
						}]
					})
				}
			}
		case 'depopListings':
			return {
				url: 'https://sanctuaryapi.net/itemlistings?' + new URLSearchParams({
					'source': 'depop',
					'search': filter.search,
					'size': filter.size
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'klekt1':
			return {
				url: 'https://apiv2.klekt.com/shop-api?' + new URLSearchParams({
					"vendure-token": "iqrhumfu2u9mumwq369"
				}),
				headers: {
					method: 'POST',
					headers: new Headers({
						"content-type": "application/json;charset=UTF-8"
					}),
					body: JSON.stringify({
						"operationName": "SearchProducts",
						"variables": {
							"input": {
								"availability": "available",
								"facetSlugs": [],
								"facetValueIds": [],
								"groupByProduct": true,
								"sizeType": null,
								"sort": {"featured": "DESC"},
								"take": 1, "skip": 0,
								"term": filter.search
							}
						},
						"query": `query SearchProducts($input: SearchInput!) {
							search(input: $input) { items { productId } } }`
					})
				}
			}
		case 'klekt2':
			return {
				url: 'https://apiv2.klekt.com/shop-api?' + new URLSearchParams({
					"vendure-token": "iqrhumfu2u9mumwq369"
				}),
				headers: {
					method: 'POST',
					headers: new Headers({
						"content-type": "application/json;charset=UTF-8"
					}),
					body: JSON.stringify({
						"query": `query {
							productDetails(id: ${filter.pid}) {
								name slug variants { availableCount priceWithTax facetValues { code } }
							}
						}`
					})
				}
			}
		default: 
			return {
				url: 'https://sanctuaryapi.net/browse',
				headers: {
					method: 'GET'
				}
			}
	}
}