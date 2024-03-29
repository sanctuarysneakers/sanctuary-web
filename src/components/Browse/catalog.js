import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import useAPICall from '../../hooks/useApiCall'
import createRequestObject from '../../api/createRequest'
import InfiniteScroll from 'react-infinite-scroll-component'
import ItemCard from '../Item/itemCard'

export default function Catalog ({ searchTerm }) {
  const browseData = useSelector(state => state.browse.browseData)
  const browseFilters = useSelector(state => state.browse.filters)
  const currency = useSelector(state => state.currency)
  const size = useSelector(state => state.size)

  const [items, updateItems] = useState(browseData)
  const [page, updatePage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useAPICall('browse', { searchTerm })

  async function fetchMore () {
    const filters = {
      search: searchTerm,
      size,
      currency,
      brands: browseFilters.brands,
      gender: browseFilters.gender,
      sort: browseFilters.sortBy,
      page: page + 1
    }
    const request = createRequestObject('browse', filters)

    const response = await fetch(request.url, request.headers)
    const results = await response.json()

    if (results !== null) {
      updateItems(items.concat(results))
      updatePage(page + 1)

      if (results.length < 40) setHasMore(false)
    }
  }

  useEffect(() => {
    updateItems(browseData)
  }, [browseData])

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMore}
      hasMore={hasMore}
      className='catalog'
    >
      {items.length !== 0 && items.map((item) => (
        <ItemCard key={item.id} data={item} />
      ))}
    </InfiniteScroll>
  )
}

Catalog.propTypes = {
  searchTerm: PropTypes.string
}
