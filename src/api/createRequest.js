import { apiURL, autosuggestAPI } from '../assets/constants'

export default function createRequestObject (type, filter) {
  switch (type) {
  case 'browse':
    return {
      url: `${apiURL}/browse`,
      headers: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      }
    }
  case 'browsecollection':
    return {
      url: `${apiURL}/browsecollection`,
      headers: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      }
    }
  case 'iteminfo':
    return {
      url: `${apiURL}/iteminfo?` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'relateditems':
    return {
      url: `${apiURL}/relateditems?` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'stockx':
    return {
      url: `${apiURL}/lowestprices?source=stockx&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'footlocker':
    return {
      url: `${apiURL}/lowestprices?source=footlocker&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'ebay':
    return {
      url: `${apiURL}/lowestprices?source=ebay&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'klekt':
    return {
      url: `${apiURL}/lowestprices?source=klekt&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'goat':
    return {
      url: `${apiURL}/lowestprices?source=goat&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'flightclub':
    return {
      url: `${apiURL}/lowestprices?source=flightclub&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'ebaylistings':
    return {
      url: `${apiURL}/listings?source=ebay&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'depop':
    return {
      url: `${apiURL}/listings?source=depop&` + new URLSearchParams(filter),
      headers: {
        method: 'GET'
      }
    }
  case 'grailed':
    return {
      url: `${apiURL}/listings?source=grailed&` + new URLSearchParams(filter),
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
  case 'portfolio_get':
    return {
      url: `${apiURL}/portfolio?` + new URLSearchParams(filter),
      headers: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  case 'portfolio_add':
    return {
      url: `${apiURL}/portfolio`,
      headers: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      }
    }
  case 'portfolio_remove':
    return {
      url: `${apiURL}/portfolio?` + new URLSearchParams(filter),
      headers: {
        method: 'DELETE'
      }
    }
  default:
    return {
      url: `${apiURL}/browse`,
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
