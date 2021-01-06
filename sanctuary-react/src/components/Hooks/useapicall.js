import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { stockxCall, goatCall, grailedCall, flightClubCall, shoeComparisonCall } from '../../redux/actions'

import { createStockxURL, createGoatURL, createGrailedURL, createFlightclubURL } from './createurl'
import { processStockxData, processGoatData, processGrailedData, processFlightclubData } from './processdata'
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

    async function catalogAPICall() {

        const sites = ["stockx", "goat", "grailed"/*, "flightclub"*/];

        const createURLMap = {
            'stockx': createStockxURL,
            'goat': createGoatURL,
            'grailed': createGrailedURL,
            'flightclub': createFlightclubURL
        };
        const processDataMap = {
            'stockx': processStockxData,
            'goat': processGoatData,
            'grailed': processGrailedData,
            'flightclub': processFlightclubData
        }
        const dispatchMap = {
            'stockx': stockxCall,
            'goat': goatCall,
            'grailed': grailedCall,
            'flightclub': flightClubCall
        }

        for await (const site of sites) {
            const request = createURLMap[site](filter.search, filter.size, filter.price_low, filter.price_high);
            const response = await fetch(request.url, request.headers);
            let data = await response.json();
            let processedData = processDataMap[site](data);
            dispatch(dispatchMap[site](processedData));
        }

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