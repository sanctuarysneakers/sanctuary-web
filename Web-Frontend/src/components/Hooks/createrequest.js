
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
					"shoeSize": filter.size
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
		case 'grailed':
			return {
				url: 'https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries?' + new URLSearchParams({
					"x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser",
					"x-algolia-application-id": "MNRWEFSS2Q", "x-algolia-api-key": "a3a4de2e05d9e9b463911705fb6323ad"
				}),
				headers: {
					method: 'POST',
					body: JSON.stringify({
						"requests": [{
							"indexName": "Listing_by_low_price_production",
							"params": new URLSearchParams({
								"query": filter.search,
								"facetFilters": `[[\"category_size:footwear.${filter.size}\"], [\"condition:is_new\",\"condition:is_gently_used\"]]`,
							}).toString()
						}]
					})
				}
			}
		case 'ebay':
			return {
				url: 'https://svcs.ebay.com/services/search/FindingService/v1?' + new URLSearchParams({
					"keywords": filter.search,
					"categoryId": "93427",
					"sortOrder": "PricePlusShippingLowest",
					"itemFilter(0).name": "AvailableTo",
					"itemFilter(0).value": filter.shipTo,
					"itemFilter(1).name": "Condition",
					"itemFilter(1).value": 1000,
					"itemFilter(2).name": "HideDuplicateItems",
					"itemFilter(2).value": true,
					"aspectFilter(0).aspectName": "US Shoe Size (Men's)",
					"aspectFilter(0).aspectValueName": filter.size.toString()
				}),
				headers: {
					method: 'GET',
					headers: new Headers({
						"X-EBAY-SOA-SECURITY-APPNAME": "Sanctuar-jasontho-PRD-ad4af8740-c80ac57c",
						"X-EBAY-SOA-RESPONSE-DATA-FORMAT": "JSON",
						"X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced"
					})
				}
			}
		case 'depop':
			const size_map = {7:"2", 7.5:"3", 8:"4", 8.5:"5", 9:"6", 9.5:"7", 10:"8", 10.5:"9", 11:"10", 11.5:"11",
				12: "12", 12.5:"13", 13:"14", 13.5:"15", 14:"16", 14.5:"17", 15:"18"}
			return {
				url: 'https://webapi.depop.com/api/v2/search/products?' + new URLSearchParams({
					"what": filter.search,
					"sizes": "6-77." + size_map[filter.size],
					"country": "us",
					"conditions": "brand_new, used_like_new"
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
		case 'sneakercon1':
			return {
				url: 'https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/marketplace/all?' + new URLSearchParams({
					"search": filter.search,
					"size": filter.size,
					"limit": "1",
					"isNew": "true"
				}),
				headers: {
					method: 'GET',
					headers: new Headers({
						"origin": "https://sneakercon.com"
					})
				}
			}
		case 'sneakercon2':
			return {
				url: `https://war6i72q7j.execute-api.us-east-1.amazonaws.com/prod/public/bid/new/makeofferdetails/${filter.pid}`,
				headers: {
					method: 'GET',
					headers: new Headers({
						"origin": "https://sneakercon.com"
					})
				}
			}
	}
}