import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { stockxCall, goatCall, grailedCall, flightClubCall, shoeComparisonCall } from '../../redux/actions'

import shoeDataReformat from './shoedatareformat'


export default function useAPICall(callType) {
    /* 
        callType is either 'catalog' or 'comparison' which indicates whether the API call
        is being made to update the main catalog or if it is being made to update the
        shoes for price comparison inside of a shoe modal.
    */

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const shoe = useSelector(state => state.shoe)
    const newSearchHappened = useSelector(state => state.newSearchHappened)

    function catalogAPICall() {

        const dispatchMap = {
            "stockx": stockxCall,
            "goat": goatCall,
            "grailed": grailedCall,
            "flightclub": flightClubCall
        }

        function applyFilter() {
            let url = `https://sanctuaryapi.net/?`

            if (filter.search) url += `&search=${filter.search}`
            if (filter.size && filter.size > 0) url += `&size=${filter.size}`
            if (filter.price_low && filter.price_low > 0) url += `&price_low=${filter.price_low}`
            if (filter.price_high && filter.price_high > 0) url += `&price_high=${filter.price_high}`

            return url
        }

        async function fetchData(url) {

            let sites = ["stockx", "goat", "grailed", "flightclub"]

            for await (const site of sites) {
                if (site === "stockx") {
                    let stockx_url = 'https://stockx.com/api/browse?';

                    if (filter.search) stockx_url += `&_search=${filter.search}`
                    if (filter.size && filter.size > 0) stockx_url += `&shoeSize=${filter.size}`
                    stockx_url += `&market.lowestAsk=range(0|100000)`
                    stockx_url += `&page=1`
                    stockx_url += `&productCategory=sneakers`
                    stockx_url += `&gender=men`

                    const response = await fetch(stockx_url)
                    let data = await response.json()
                    let data2 = data["Products"]
                    let results = []
                    for (const item of data2) {
                        if (results.length > 20)
                            break
                        results.push({
                            "id": item["objectID"],
                            "source": "stockx",
                            "model": item["title"],
                            "sku_id": item["styleId"],
                            "size": filter.size,
                            "price": item["market"]["lowestAsk"],
                            "shoe_condition": item["condition"],
                            "category": item["category"],
                            "url": "stockx.com/" + item["urlKey"],
                            "image": item["media"]["imageUrl"],
                            "image_thumbnail": item["media"]["imageUrl"].split('?')[0] + "?w=300&q=50&trim=color"
                        })
                    }                  
                    console.log(JSON.stringify(results))
                    dispatch(dispatchMap[site](results))
                } else {
                    const response = await fetch(url + `&source=${site}`)
                    let data = await response.json()
                    if ("message" in data && data["message"] === "Internal Server Error") data = []
                    dispatch(dispatchMap[site](shoeDataReformat(data)))
                }
            }
        }

        let url = applyFilter()
        fetchData(url)
    }

    function comparisonAPICall() {

        async function fetchData(url) {
            const response = await fetch(url)
            let data = await response.json()
            if ("message" in data && data["message"] === "Internal Server Error") data = []
            dispatch(shoeComparisonCall(shoeDataReformat(data)))
        }

        // fix until comparison for grailed gets implemented
        if (shoe.source === 'grailed') {
            dispatch(shoeComparisonCall([]))
            return
        }

        let url = `https://sanctuaryapi.net/compare?source=${shoe.source}&size=${shoe.size}&sku=${shoe.sku_id}`
        fetchData(url)
    }

    useEffect(() => {
        if (callType === 'catalog') {
            catalogAPICall()
        }
    }, [newSearchHappened])

    useEffect(() => {
        if (callType === 'comparison') {
            comparisonAPICall()
        }
    }, [shoe])
}