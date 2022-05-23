import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import useAPICall from '../../hooks/useApiCall'
import createRequestObject from '../../hooks/createRequest'
import ItemCard from '../Item/itemCard'

export default function Catalog({ search_query }) {

    const browseData = useSelector(state => state.browse.browseData)
    const currency = useSelector(state => state.currency)
    let location = useSelector(state => state.location)
    
    let [items, updateItems] = useState(browseData)
    let [page, updatePage] = useState(1)
    let [hasMore, setHasMore] = useState(true)

    useAPICall('browse', {query: search_query})

    async function fetchMore() {
        const request = createRequestObject('browse', {
            search: search_query,
            currency: currency,
            page: page+1, 
            ship_to: location['country_code']
        })
        
        const response = await fetch(request.url, request.headers)
        let results = await response.json()
        results = results.filter(item => !item["model"].includes("(GS)") && !item["model"].includes("(TD)") && !item["model"].includes("(PS)"))

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
