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
                const response = await fetch(url + `&source=${site}`)
                let data = await response.json()
                if ("message" in data && data["message"] === "Internal Server Error") data = []
                dispatch(dispatchMap[site](shoeDataReformat(data)))
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

        let url = `http://sanctuaryapi.net/compare?source=${shoe.source}&size=${shoe.size}&sku=${shoe.sku_id}`
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