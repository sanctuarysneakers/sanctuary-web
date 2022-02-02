
export default function createRequestObject(type, filter) {
	switch (type) {
		case 'browse':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/browse?' + new URLSearchParams({
					"search": filter.search ? filter.search : '',
					"page": filter.page ? filter.page : 1,
					"gender": filter.gender ? filter.gender : '',
					"min_price": filter.min_price ? filter.min_price : 0,
					"max_price": filter.max_price ? filter.max_price : 99999
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'stockx':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/lowestprice?' + new URLSearchParams({
					"source": "stockx",
					"search": filter.search,
					"size": filter.size,
					"gender": filter.gender
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'stockxInfo':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/lowestprice?' + new URLSearchParams({
					"source": "stockx",
					"search": filter.search,
					"gender": filter.gender
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'ebay':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/lowestprice?' + new URLSearchParams({
					'source': 'ebay',
					'search': filter.search,
					'size': filter.size,
					'ship_to': filter.shipTo
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'klekt':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/lowestprice?' + new URLSearchParams({
					"source": "klekt",
					"search": filter.search,
					"size": filter.size
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
						"facetFilters": `(product_category: shoes), (presentation_size: ${filter.size}), (shoe_condition:new_no_defects)`,
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
						"facetFilters": `[["size_us_men:${parseFloat(filter.size).toFixed(1)}"],["shoe_condition:new_no_defects"]]`,
					})
				}
			}
		case 'ebayListings':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/itemlistings?' + new URLSearchParams({
					'source': 'ebay',
					'search': filter.search,
					'size': filter.size,
					'ship_to': filter.shipTo
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'depopListings':
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/itemlistings?' + new URLSearchParams({
					'source': 'depop',
					'search': filter.search,
					'size': filter.size,
					'gender': filter.gender
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
		case 'autocomplete': 
			return {
				url: 'https://xw7sbct9v6-dsn.algolia.net/1/indexes/PRODUCTION_PG_FEATURED_DESC/query?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
					"x-algolia-application-id": "XW7SBCT9V6", "x-algolia-api-key": "YTgyMDU5MDkxYmQ1MDMwZTRiODNiZmIwZTBmNGY2OWRjNWRjOWY4MzkxZWUxOTAzZWQxMGQ3M2FmZjMwNTlhZnZhbGlkVW50aWw9MTY0MzkzNzMzOQ=="
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"query": filter.search,
						"facets": "",
						"facetFilters": ["dataType: product", ["gender: men", "gender: women"], "productCategory: sneakers"],
						"filters": "NOT hidden AND NOT _tags:charity",
						"page": 0
					})
				}
			}
		default: 
			return {
				url: 'https://hdwj2rvqkb.us-west-2.awsapprunner.com/browse',
				headers: {
					method: 'GET'
				}
			}
	}
}