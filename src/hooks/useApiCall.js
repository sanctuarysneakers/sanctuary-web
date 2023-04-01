import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  browseCall, updateItemInfo, updateItemPrices, updateItemListings,
  updateRelatedItems, setRelatedItemsLoading, setItemPricesLoading, setItemListingsLoading,
  updateFeaturedCollections
} from '../redux/actions'
import createRequestObject from './createRequest'
import {
  stockxLowestPrice, footlockerLowestPrice, goatLowestPrice, flightclubLowestPrice,
  ebayLowestPrice, klektLowestPrice, grailedListings, ebayListings, depopListings,
  collectionItems
} from './scrapers'
import { getLocation } from '../hooks/useLocationDetection'

export default function useAPICall (callType, params) {
  const history = useHistory()
  const dispatch = useDispatch()

  let location = useSelector(state => state.location)
  const size = useSelector(state => state.size)
  const currency = useSelector(state => state.currency)

  function SafePromiseAll (promises, def = null) {
    return Promise.all(
      promises.map(p => p.catch(def))
    )
  }

  async function browse (searchTerm) {
    const params = {
      currency,
      size,
      ship_to: location.country_code
    }

    const filters = {
      search: searchTerm
    }

    const request = createRequestObject('browse', { ...params, ...filters })

    try {
      const response = await fetch(request.url, request.headers)
      if (!response.ok) throw new Error()

      const results = await response.json()
      if (!results.length) throw new Error()

      dispatch(browseCall(results))
    } catch (e) {
      dispatch(browseCall([]))
    }
  }

  async function getItem (params) {
    if (location === null) { location = await getLocation() }

    const itemInfo = params.fromBrowse ? params.fromBrowse : await getItemInfo(params.itemKey, params.gender)
    dispatch(updateItemInfo(itemInfo))

    await SafePromiseAll(
      [
        getItemPrices(itemInfo, params.size, params.gender),
        getItemListings(itemInfo, params.size, params.gender),
        getRelatedItems(itemInfo)
      ],
      []
    )
  }

  async function getItemInfo (itemKey, gender) {
    try {
      const request = createRequestObject('browse', {
        search: itemKey,
        gender
      })

      const response = await fetch(request.url, request.headers)
      if (!response.ok) throw new Error()

      const results = await response.json()
      const itemInfo = extractItemInfo(results, itemKey)

      if (!itemInfo) { throw Error() }

      return {
        sku: itemInfo.sku,
        modelName: itemInfo.model,
        image: itemInfo.image,
        url: itemInfo.url,
        urlKey: itemInfo.urlKey
      }
    } catch (e) {
      console.log(e)
      history.replace('/item-not-supported')
      return null
    }
  }

  function extractItemInfo (results, itemKey) {
    const itemKeyNoSpaces = itemKey.replaceAll(' ', '')
    for (let x = 0; x < results.length; x++) {
      const resultItem = results[x]
      if (resultItem.sku.replaceAll('-', ' ') === itemKey || resultItem.sku === itemKey || resultItem.sku.includes(itemKey) || resultItem.urlKey === itemKey) {
        return resultItem
      }

      // handles case where sku contains multiple skus separated by '/'
      const skus = resultItem.sku.split('/')

      // when searching by urlkey, the correct item info might not be the first result so need to loop through all
      for (let i = 0; i < skus.length; i++) {
        skus[i] = skus[i].replaceAll('-', ' ')
        if (skus[i].includes(itemKey) || skus[i].includes(itemKeyNoSpaces)) { return resultItem }
      }
    }

    return null
  }

  async function getItemPrices (item, size, gender) {
    const filter = {
      size,
      gender,
      country: location.country_code,
      postalCode: location.postal_code,
      currency
    }
    let results = await SafePromiseAll(
      [
        stockxLowestPrice(item, filter),
        ebayLowestPrice(item, filter),
        flightclubLowestPrice(item, filter),
        goatLowestPrice(item, filter),
        klektLowestPrice(item, filter),
        footlockerLowestPrice(item, filter)
      ]
    )
    results = results.filter(elements => { return elements !== null })
    results = results.filter(r => r.price !== 0)
    results.sort((a, b) => a.price - b.price)

    dispatch(updateItemPrices(results))
    dispatch(setItemPricesLoading(false))
  }

  async function getItemListings (item, size, gender) {
    const filter = {
      size,
      gender,
      country: location.country_code,
      postalCode: location.postal_code,
      currency
    }

    let results = await SafePromiseAll(
      [
        ebayListings(item, filter),
        depopListings(item, filter),
        grailedListings(item, filter)
      ]
    )
    results = results.flat()
    results = results.filter(elements => { return elements !== null })
    results = results.filter(r => r.price !== 0)
    results.sort((a, b) => a.price - b.price)
    dispatch(updateItemListings(results))
    dispatch(setItemListingsLoading(false))
  }

  async function getRelatedItems (item) {
    const params = {
      search: item.modelName.replace('(W)', ''),
      size,
      currency,
      ship_to: location.country_code
    }

    const request = createRequestObject('related', params)

    try {
      const response = await fetch(request.url, request.headers)
      if (!response.ok) throw new Error()
      const results = await response.json()

      dispatch(updateRelatedItems(results))
    } catch (e) {
      console.error(e, e.stack)
      dispatch(updateRelatedItems([]))
    }
    setRelatedItemsLoading(false)
  }

  async function getFeaturedCollections () {
    const params = {
      currency,
      size,
      ship_to: location.country_code
    }

    const featuredCollectionRequests = [
      {
        title: 'Most Popular',
        promise: collectionItems({ ...params, collection_id: 'most-wanted-new' })
      },
      {
        title: 'Fresh Drops',
        promise: collectionItems({ ...params, collection_id: 'just-dropped' })
      },
      {
        title: 'Ladies',
        promise: collectionItems({ ...params, collection_id: 'women-s-sneakers' })
      }
    ]

    const res = await SafePromiseAll(featuredCollectionRequests.map(req => req.promise))

    const featuredCollections = featuredCollectionRequests.map((req, index) => {
      return { ...req, data: res[index] }
    })

    // update featured requests
    dispatch(updateFeaturedCollections(featuredCollections))
  }

  useEffect(() => {
    if (callType === 'getitem') {
      getItem(params)
    } else if (callType === 'featuredcollections') {
      getFeaturedCollections()
    } else {
      browse(params.searchTerm)
    }
  }, [currency, size])
}
