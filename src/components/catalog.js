import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux'
import useAPICall from './Hooks/useApiCall'
import ItemCard from './itemCard'

export default function Catalog({ search_query }) {
    const browseData = useSelector(state => state.browseData)

    useEffect(() => {
        updateItems(browseData)
    }, [browseData])
    
    useAPICall('browse', {query: search_query})

    var [items, updateItems] = useState(browseData)
    let itemCards2

    const fetchMore = () => {
        itemCards2 = []
        for (var i= 0; i < 20; i++) {
            itemCards2.push(items[i])  
        }
        updateItems(items.concat(itemCards2))
    }
    return (
        <div className='catalog'>
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchMore}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
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
