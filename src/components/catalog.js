import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux'
import useAPICall from './Hooks/useApiCall'
import ItemCard from './itemCard'

export default function Catalog({ search_query }) {
    const browseData = useSelector(state => state.browseData)
    const rate = useSelector(state => state.rate)

    useEffect(() => {
        updateItems(browseData)
    }, [browseData])
    
    useAPICall('browse', {query: search_query, from: 0})

    var [items, updateItems] = useState(browseData)
    var [i, updateI] = useState(0)
    var [hasMore, setHasMore] = useState(true)
    
    const query = search_query ? '&search=' + search_query : ''

    function convertResults(results) {
        for (let j = 0; j < results.length; j++) {
            if (!isNaN(rate))
                results[j]["lastSale"] = Math.round(results[j]["lastSale"] * rate)
            else {
                results[j]["lastSale"] = "---"
            }
        }
        return results
    }

    async function fetchMore() {
        updateI(i = i + 1)
        var url = 'https://sanctuaryapi.net/browse?' + 'from=' + (i * 40) + query
        const response = await fetch(url, {method: 'GET'})
        if (!response.ok) throw new Error()
        let results = await response.json()
        results = convertResults(results)
        if (results.length !== 40)
            setHasMore(false)
        updateItems(items.concat(results))
    }

    return (
        <div className='catalog'>
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchMore}
                hasMore={hasMore}
                // loader={}
                endMessage={
                    <p style={{ textAlign: 'center'}}>
                    <b>{items.length} Results found.</b>
                    </p>
                }
                className='catalog'
                >
                    {items.length !== 0 && items.map((item) => (
                        <ItemCard key={item.id} data={item}></ItemCard>
                    ))}
            </InfiniteScroll>
        </div>
    )
}
