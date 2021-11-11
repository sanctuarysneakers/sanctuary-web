import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux'
import useAPICall from './Hooks/useApiCall'
import ItemCard from './itemCard'

export default function Catalog({ search_query }) {

    const browseData = useSelector(state => state.browseData)
    const rate = useSelector(state => state.rate)
    
    var [items, updateItems] = useState(browseData)
    var [i, updateI] = useState(1)
    var [hasMore, setHasMore] = useState(true)

    useAPICall('browse', {query: search_query})
    
    function convertResults(results) {
        for (let j = 0; j < results.length; j++) {
            if (!isNaN(rate))
                results[j]["lastSale"] = Math.round(results[j]["lastSale"] * rate)
            else
                results[j]["lastSale"] = "---"
        }
        return results
    }

    async function fetchMore() {
        const url = `https://sanctuaryapi.net/browse?search=${search_query}&from=${(i*40)}`
        const response = await fetch(url, {method: 'GET'})
        let results = await response.json()
        results = convertResults(results)

        updateItems(items.concat(results))
        updateI(i + 1)
        if (results.length !== 40) setHasMore(false)
    }

    useEffect(() => {
        updateItems(browseData)
    }, [browseData])

    return (
        <div className='catalog'>
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
        </div>
    )
}
