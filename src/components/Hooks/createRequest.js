export default function createRequestObject(type, filter) {

	const api = 'https://hdwj2rvqkb.us-west-2.awsapprunner.com'

	switch (type) {
		case 'browse':
			return {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				url: `${api}/browse`,
=======
				url: `${api}/browse3?`,
>>>>>>> 35549177 (remove categoryfilter)
=======
				url: `${api}/browse3`,
>>>>>>> 8b41e538 (misc)
=======
				url: `${api}/browse`,
>>>>>>> b9fdaa8f (misc)
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
				url: `${api}/itemprices?` + new URLSearchParams({
					"source": "stockx",
					"search": filter.search,
					"size": filter.size,
					"gender": filter.gender
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'ebay':
			return {
				url: `${api}/itemprices?` + new URLSearchParams({
					'source': 'ebay',
					'search': filter.search,
					'size': filter.size,
					'ship_to': filter.shipTo,
					'postal_code': filter.postalCode ? filter.postalCode : null
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'klekt':
			return {
				url: `${api}/itemprices?` + new URLSearchParams({
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
				url: `${api}/itemprices?` + new URLSearchParams({
					"source": "goat",
					"search": filter.search,
					"size": filter.size
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'flightclub':
			return {
				url: `${api}/itemprices?` + new URLSearchParams({
					"source": "flightclub",
					"search": filter.search,
					"size": filter.size
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'ebayListings':
			return {
				url: `${api}/itemprices?` + new URLSearchParams({
					'source': 'ebay',
					'search': filter.search,
					'size': filter.size,
					'ship_to': filter.shipTo,
					'postal_code': filter.postalCode ? filter.postalCode : null
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'depopListings':
			return {
				url: `${api}/itemprices?` + new URLSearchParams({
					'source': 'depop',
					'search': filter.search,
					'size': filter.size,
					'gender': filter.gender,
					'ship_to': filter.shipTo
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'grailedListings':
			return {
				url: `${api}/itemprices?` + new URLSearchParams({
					"source": "grailed",
					"search": filter.search,
					"size": filter.size,
					"ship_to": filter.country
				}),
				headers: {
					method: 'GET'
				}
			}
		case 'autocomplete': 
			return {
				url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2_trending_purchase/query?' + new URLSearchParams({
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
		case 'shippingPrices':
			return {
				url: `${api}/shippingprices2?` + new URLSearchParams({
					'country': filter.country
				}),
				headers: {
					method: 'GET'
				}
			}

		
		default: 
			return {
<<<<<<< HEAD
<<<<<<< HEAD
				url: `${api}/browse`,
				headers:  {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: {}, 
=======
				url: `${api}/browse3`,
=======
				url: `${api}/browse`,
>>>>>>> b9fdaa8f (misc)
				headers: {
					method: 'POST'
>>>>>>> 35549177 (remove categoryfilter)
				}
			}
	}
}