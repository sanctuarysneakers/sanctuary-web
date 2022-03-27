import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import useAPICall from './Hooks/useApiCall'
import createRequestObject from './Hooks/createRequest'
import ItemCard from './itemCard'

export default function Catalog({ searchTerm }) {

    const browseData = useSelector(state => state.browseData)
    const currency = useSelector(state => state.currency)

    //filters 
    const sort = useSelector(state => state.browseFilters.sort)
    const brand = useSelector(state => state.browseFilters.brand)
    const priceRanges = useSelector(state => state.browseFilters.priceRanges)
    const sizeTypes = useSelector(state => state.browseFilters.sizeTypes)
    const releaseYears = useSelector(state => state.browseFilters.releaseYears)
    
    let [items, updateItems] = useState(browseData)
    let [page, updatePage] = useState(1)
    let [hasMore, setHasMore] = useState(true)

    useAPICall('browse', { searchTerm })

    async function currencyConversionRate(from, to) {
        const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/currencyrate2?from_curr=${from}&to_curr=${to}`
        const response = await fetch(url)
        return await response.json()
    }
    
    async function convertCurrency(results) {
        const rate = await currencyConversionRate("USD", currency)
        for (let i = 0; i < results.length; i++)
            results[i]["price"] = !isNaN(rate) ? Math.round(results[i]["price"] * rate) : "---"
        return results
    }

    async function fetchMore() {
        const request = createRequestObject('browse', {search: searchTerm, page: page+1, sort, brand, priceRanges, sizeTypes, releaseYears})
        const response = await fetch(request.url, request.headers)
        let results = await response.json()
        results = await convertCurrency(results)
        
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
