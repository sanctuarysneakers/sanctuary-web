
export default function createRequestObject(type, filter) {

	const api = 'https://hdwj2rvqkb.us-west-2.awsapprunner.com'
	const autosuggestAPI = 'https://2fwotdvm2o-dsn.algolia.net'

	switch (type) {
		case 'browse':
			return {
				url: `${api}/browse`,
				headers:  {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(filter), 
				}
			}
		case 'browse_collection':
			return {
				url: `${api}/browse_collection`,
				headers:  {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(filter), 
				}
			}
		case 'stockx':
			return {
				url: `${api}/itemprices?source=stockx&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'ebay':
			return {
				url: `${api}/itemprices?source=ebay&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'klekt':
			return {
				url: `${api}/itemprices?source=klekt&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'goat':
			return {
				url: `${api}/itemprices?source=goat&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'flightclub':
			return {
				url: `${api}/itemprices?source=flightclub&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'depop':
			return {
				url: `${api}/itemprices?source=depop&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'grailed':
			return {
				url: `${api}/itemprices?source=grailed&` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		case 'autocomplete': 
			return {
				url: `${autosuggestAPI}/1/indexes/product_variants_v2_trending_purchase/query?` + new URLSearchParams({
					"x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
					"x-algolia-application-id": "2FWOTDVM2O", "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"query": filter.search,
						"distinct": true,
						"facets": "",
						"facetFilters": ["product_category: shoes", "single_gender: -youth"],
						"hitsPerPage": 15, 
						"page": 0
					})
				}
			}
		case 'related': 
			return {
				url: `${api}/itemrelated?` + new URLSearchParams(filter),
				headers: {
					method: 'GET'
				}
			}
		default: 
			return {
				url: `${api}/browse`,
				headers:  {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: {}, 
				}
			}
	}
}