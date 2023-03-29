
export default function createRequestObject (type, filter) {
  const api = 'https://hdwj2rvqkb.us-west-2.awsapprunner.com'
  // const api = 'http://127.0.0.1:8080'
  const autosuggestAPI = 'https://2fwotdvm2o-dsn.algolia.net'

  switch (type) {
    case 'browse':
      return {
        url: `${api}/browse`,
        headers: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filter)
        }
      }
    case 'browse_collection':
      return {
        url: `${api}/browse_collection`,
        headers: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filter)
        }
      }
    case 'stockx':
      return {
        url: `${api}/lowestprices?source=stockx&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'footlocker':
      return {
        url: `${api}/lowestprices?source=footlocker&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'ebay':
      return {
        url: `${api}/lowestprices?source=ebay&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'klekt':
      return {
        url: `${api}/lowestprices?source=klekt&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'goat':
      return {
        url: `${api}/lowestprices?source=goat&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'flightclub':
      return {
        url: `${api}/lowestprices?source=flightclub&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'ebaylistings':
      return {
        url: `${api}/listings?source=ebay&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'depop':
      return {
        url: `${api}/listings?source=depop&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'grailed':
      return {
        url: `${api}/listings?source=grailed&` + new URLSearchParams(filter),
        headers: {
          method: 'GET'
        }
      }
    case 'autocomplete':
      return {
        url: `${autosuggestAPI}/1/indexes/product_variants_v2_trending_purchase/query?` + new URLSearchParams({
          'x-algolia-agent': 'Algolia for vanilla JavaScript 3.25.1',
          'x-algolia-application-id': '2FWOTDVM2O',
          'x-algolia-api-key': 'ac96de6fef0e02bb95d433d8d5c7038a'
        }),
        headers: {
          method: 'POST',
          body: JSON.stringify({
            query: filter.search,
            distinct: true,
            facets: '',
            facetFilters: ['product_category: shoes', 'single_gender: -youth'],
            hitsPerPage: 15,
            page: 0
          })
        }
      }
    case 'related':
      return {
        url: `${api}/relateditems`,
        headers: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filter)
        }
      }
    default:
      return {
        url: `${api}/browse`,
        headers: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {}
        }
      }
  }
}
