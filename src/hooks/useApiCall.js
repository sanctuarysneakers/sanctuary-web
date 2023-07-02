import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLocation } from '../hooks/useLocationDetection'
import createRequestObject from '../api/createRequest'
import { SafePromiseAll } from '../api/helpers'
import { getPortfolioData, getPortfolioStats } from '../api/portfolioFunctions'
import { getItemInfo, getItemPrices, getItemListings, getRelatedItems } from '../api/aggregator'
import { collectionItems } from '../api/dataSources'
import {
  browseCall, updateItemInfo, updateItemPrices, updateItemListings,
  updateRelatedItems, setRelatedItemsLoading, setItemPricesLoading,
  setItemListingsLoading, updateFeaturedCollections, setPortfolioLoading,
  updatePortfolioData, updatePortfolioStats
} from '../redux/actions'

export default function useAPICall (callType, params) {
  const history = useHistory()
  const dispatch = useDispatch()

  let location = useSelector(state => state.location)
  const size = useSelector(state => state.size)
  const currency = useSelector(state => state.currency)
  const browseFilters = useSelector(state => state.browse.filters)
  const user = useSelector(state => state.user)

  async function browse (searchTerm) {
    const filters = {
      search: searchTerm,
      size,
      currency,
      brands: browseFilters.brands,
      gender: browseFilters.gender,
      sort: browseFilters.sortBy
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
    if (!location) { location = await getLocation() }

    const itemInfo = params.fromBrowse ? params.fromBrowse : await getItemInfo(params.itemKey, params.gender)
    if (!itemInfo) { history.replace('/item-not-supported') }

    dispatch(updateItemInfo(itemInfo))

    const results = await SafePromiseAll([
      getItemPrices(itemInfo, size, params.gender, currency, location),
      getItemListings(itemInfo, size, params.gender, currency, location),
      getRelatedItems(itemInfo, size, currency, location)
    ], [])

    dispatch(updateItemPrices(results[0].filter(item => Object.keys(item).length !== 0)))
    dispatch(updateItemListings(results[1].filter(item => Object.keys(item).length !== 0)))
    dispatch(updateRelatedItems(results[2]))
    dispatch(setItemPricesLoading(false))
    dispatch(setItemListingsLoading(false))
    dispatch(setRelatedItemsLoading(false))
  }

  async function getFeaturedCollections () {
    const params = {
      currency,
      ship_to: location?.country_code
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

  async function getPortfolio () {
    if (user) {
      dispatch(setPortfolioLoading(true))

      const data = await getPortfolioData(user.localId, currency, location)
      dispatch(updatePortfolioData(data))

      const stats = getPortfolioStats(data)
      dispatch(updatePortfolioStats(stats))

      dispatch(setPortfolioLoading(false))
    }
  }

  useEffect(() => {
    if (callType === 'getitem') {
      getItem(params)
    } else if (callType === 'featuredcollections') {
      getFeaturedCollections()
    } else if (callType === 'portfolio') {
      getPortfolio()
    } else if (callType === 'browse') {
      browse(params.searchTerm)
    }
  }, [user, currency, size, browseFilters])
}
