import createRequestObject from './createRequest'

// lowest prices

export async function stockxLowestPrice (item, filter) {
  try {
    const model = item.model.replace('(W)', '')
    const sku = item.sku.replace(' ', '-')
    const request = createRequestObject('stockx', {
      model_name: model,
      sku,
      size: filter.gender === 'women' ? filter.size - 1.5 : filter.size,
      currency: filter.currency,
      ship_to: filter.country
    })
    const response = await fetch(request.url, request.headers)
    if (!response.ok) return {}

    const itemData = await response.json()
    return itemData
  } catch (e) {
    return {}
  }
}

export async function footlockerLowestPrice (item, filter) {
  try {
    const model = item.model.replace('(W)', '')
    const sku = item.sku.replace(' ', '-')
    const request = createRequestObject('footlocker', {
      model_name: model,
      sku,
      size: filter.gender === 'women' ? filter.size - 1.5 : filter.size,
      currency: filter.currency,
      ship_to: filter.country
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return {}

    const itemData = await response.json()

    return itemData
  } catch (e) {
    return {}
  }
}

export async function ebayLowestPrice (item, filter) {
  try {
    const model = item.model.replace('(W)', '').concat(' ', item.sku)
    const request = createRequestObject('ebay', {
      model_name: model,
      size: filter.size,
      currency: filter.currency,
      ship_to: filter.country,
      postal_code: filter.postalCode
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return {}

    const itemData = await response.json()

    return itemData
  } catch (e) {
    return {}
  }
}

export async function klektLowestPrice (item, filter) {
  try {
    const request = createRequestObject('klekt', {
      sku: item.sku,
      size: filter.size,
      currency: filter.currency,
      ship_to: filter.country
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return {}

    const itemData = await response.json()

    return itemData
  } catch (e) {
    return {}
  }
}

export async function goatLowestPrice (item, filter) {
  try {
    const request = createRequestObject('goat', {
      sku: item.sku,
      size: filter.size,
      currency: filter.currency,
      ship_to: filter.country
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return {}
    const itemData = await response.json()
    return itemData
  } catch (e) {
    return {}
  }
}

export async function flightclubLowestPrice (item, filter) {
  try {
    const request = createRequestObject('flightclub', {
      sku: item.sku,
      size: filter.gender === 'women' ? filter.size - 1.5 : filter.size,
      currency: filter.currency,
      ship_to: filter.country
    })
    const response = await fetch(request.url, request.headers)
    if (!response.ok) return {}
    const itemData = await response.json()
    return itemData
  } catch (e) {
    return {}
  }
}

// listings

export async function ebayListings (item, filter) {
  try {
    const model = item.model.replace('(W)', '')
    const request = createRequestObject('ebaylistings', {
      model_name: model,
      size: filter.size,
      currency: filter.currency,
      ship_to: filter.country,
      postal_code: filter.postalCode
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return []

    const itemData = await response.json()

    return itemData
  } catch (e) {
    return []
  }
}

export async function depopListings (item, filter) {
  try {
    const model = item.model.replace('(W)', '')
    const request = createRequestObject('depop', {
      model_name: model,
      size: filter.size,
      gender: filter.gender,
      currency: filter.currency,
      ship_to: filter.country
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return []

    const itemData = await response.json()

    return itemData
  } catch (e) {
    return []
  }
}

export async function grailedListings (item, filter) {
  try {
    const model = item.model.replace('(W)', '')
    const request = createRequestObject('grailed', {
      model_name: model,
      size: filter.size,
      currency: filter.currency,
      ship_to: filter.country
    })

    const response = await fetch(request.url, request.headers)
    if (!response.ok) return []

    const itemData = await response.json()

    return itemData
  } catch (e) {
    return []
  }
}

export async function collectionItems (params) {
  const request = createRequestObject('browse_collection', params)

  try {
    const response = await fetch(request.url, request.headers)

    if (!response.ok) throw new Error()

    const results = await response.json()
    if (!results.length) throw new Error()

    return results
  } catch (e) {
    return []
  }
}
