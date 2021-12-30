import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import useAPICall from './Hooks/useApiCall'
import createRequestObject from './Hooks/createRequest'
import ItemCard from './itemCard'

export default function Catalog({ search_query }) {

    const browseData = useSelector(state => state.browseData)
    const rate = useSelector(state => state.rate)
    
    let [items, updateItems] = useState(browseData)
    let [page, updatePage] = useState(1)
    let [hasMore, setHasMore] = useState(true)

    useAPICall('browse', {query: search_query})
    
    function convertCurrency(results) {
        for (let i = 0; i < results.length; i++) {
            if (!isNaN(rate))
                results[i]["lastSale"] = Math.round(results[i]["lastSale"] * rate)
            else
                results[i]["lastSale"] = "---"
        }
        return results
    }

    async function fetchMore() {
        const request = createRequestObject('browse', {search: search_query, page: page+1})
        const response = await fetch(request.url, request.headers)
        let results = await response.json()
        results = convertCurrency(results)
        
        updateItems(items.concat(results))
        updatePage(page + 1)
        if (results.length < 40) setHasMore(false)
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
