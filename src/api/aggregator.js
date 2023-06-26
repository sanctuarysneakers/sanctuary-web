import createRequestObject from './createRequest'
import { SafePromiseAll } from './helpers'
import {
  stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, footlockerLowestPrice,
  ebayLowestPrice, klektLowestPrice, grailedListings, ebayListings, depopListings
} from './dataSources'

export async function getItemInfo (itemKey, gender) {
  const request = createRequestObject('iteminfo', {
    item_key: itemKey,
    gender
  })

  const response = await fetch(request.url, request.headers)
  if (!response.ok) return null

  const itemInfo = await response.json()
  if (!itemInfo) return null

  return itemInfo
}

export async function getItemPrices (item, size, gender, currency, location) {
  const filter = {
    size,
    gender,
    country: location.country_code,
    postalCode: location.postal_code,
    currency
  }

  let results = await SafePromiseAll([
    stockxLowestPrice(item, filter),
    footlockerLowestPrice(item, filter),
    ebayLowestPrice(item, filter),
    flightclubLowestPrice(item, filter),
    goatLowestPrice(item, filter),
    klektLowestPrice(item, filter)
  ])

  results = results.filter(elements => { return elements !== null })
  results = results.filter(r => r.price !== 0)
  results.sort((a, b) => a.price - b.price)
  return results
}

export async function getItemListings (item, size, gender, currency, location) {
  const filter = {
    size,
    gender,
    country: location.country_code,
    postalCode: location.postal_code,
    currency
  }

  let results = await SafePromiseAll([
    ebayListings(item, filter),
    depopListings(item, filter),
    grailedListings(item, filter)
  ])

  results = results.flat()
  results = results.filter(elements => { return elements !== null })
  results = results.filter(r => r.price !== 0)
  results.sort((a, b) => a.price - b.price)
  return results
}

export async function getRelatedItems (itemInfo, currency) {
  const filters = {
    model: itemInfo.model,
    silhouette: itemInfo.silhouette,
    currency
  }
  const request = createRequestObject('relateditems', filters)

  const response = await fetch(request.url, request.headers)
  if (!response.ok) return []

  const results = await response.json()
  if (!results.length) return []

  return results
}
