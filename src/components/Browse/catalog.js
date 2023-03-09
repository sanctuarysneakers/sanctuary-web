import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import useAPICall from '../../hooks/useApiCall'
import createRequestObject from '../../hooks/createRequest'
import InfiniteScroll from 'react-infinite-scroll-component'
import ItemCard from '../Item/itemCard'

export default function Catalog({ searchTerm }) {

    const browseData = useSelector(state => state.browse.browseData)
    const currency = useSelector(state => state.currency)
    const size = useSelector(state => state.size)

    let location = useSelector(state => state.location)
    
    let [items, updateItems] = useState(browseData)
    let [page, updatePage] = useState(1)
    let [hasMore, setHasMore] = useState(true)

    useAPICall('browse', { searchTerm })

    async function fetchMore() {
        const request = createRequestObject('browse', {
            currency, 
            size, 
            search: searchTerm,
            page: page+1, 
            ship_to: location['country_code']
        })
        
        const response = await fetch(request.url, request.headers)
        let results = await response.json()
       
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
