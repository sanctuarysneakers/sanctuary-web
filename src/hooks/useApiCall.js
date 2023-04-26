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
    const filters = {
      search: searchTerm,
      size,
      // TODO: include sizeType field
      currency,
    }

    const request = createRequestObject('browse', filters)

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
      const request = createRequestObject('iteminfo', {
        item_key: itemKey,
        gender,
      })

      const response = await fetch(request.url, request.headers)
      if (!response.ok) throw new Error()

      const itemInfo = await response.json()
      if (!itemInfo) throw new Error()

      return itemInfo
    
    } catch (e) {
      history.replace('/item-not-supported')
      return null
    }
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

  async function getRelatedItems (itemInfo) {
    const filters = {
      model: itemInfo.model,
      silhouette: itemInfo.silhouette,
      currency: currency,
    }
    const request = createRequestObject('relateditems', filters)

    try {
      const response = await fetch(request.url, request.headers)
      if (!response.ok) throw new Error()

      const results = await response.json()
      if (!results.length) throw new Error()

      dispatch(updateRelatedItems(results))
    } catch (e) {
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
