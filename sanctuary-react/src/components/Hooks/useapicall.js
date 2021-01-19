import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { stockxCall, goatCall, grailedCall, flightClubCall, shoeComparisonCall } from '../../redux/actions'

import createRequestObject from './createrequest'
import processData from './processdata'


export default function useAPICall(callType) {
    /* 
        callType is either 'catalog' or 'comparison' which indicates whether the API call
        is being made to update the main catalog or if it is being made to update the
        shoes for price comparison inside of a shoe modal.
    */

    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const shoe = useSelector(state => state.shoe);
    const newSearchHappened = useSelector(state => state.newSearchHappened);

    async function catalogAPICall() {

        const sites = ["stockx", "goat", "grailed", "flightclub"];
        const sliderItemLimit = 20;

        const dispatchMap = {
            'stockx': stockxCall,
            'goat': goatCall,
            'grailed': grailedCall,
            'flightclub': flightClubCall
        };

        for await (const site of sites) {
            const request = createRequestObject(site, filter);
            const response = await fetch(request.url, request.headers);
            let rawData = await response.json();
            let processedData = processData(rawData, site, sliderItemLimit);
            dispatch(dispatchMap[site](processedData));
        }

    }

    async function comparisonAPICall() {

        const siteCompareMap = {
            'stockx': ['goat', 'flightclub', 'grailed'],
            'goat': ['stockx', 'flightclub', 'grailed'],
            'grailed': [],
            'flightclub': ['stockx', 'goat', 'grailed']
        };

        const compareFilter = {
            search: shoe.sku_id,
            size: shoe.size.toString(),
            price_low: '0',
            price_high: '100000'
        };

        const compareFilterGrailed = {
            search: shoe.model,
            size: shoe.size.toString(),
            price_low: '0',
            price_high: '100000'
        };

        const itemLimit = 1; // per site

        let results = [];
        for await (const site of siteCompareMap[shoe.source]) {
            if (site == "grailed") {
                const request = createRequestObject(site, compareFilterGrailed); 
                const response = await fetch(request.url, request.headers);
                console.log(response);
                let rawData = await response.json();
                let processedData = processData(rawData, site, itemLimit);
                results.push(...processedData);   
            } else {
                const request = createRequestObject(site, compareFilter);
                const response = await fetch(request.url, request.headers);
                console.log(response);
                let rawData = await response.json();
                let processedData = processData(rawData, site, itemLimit);
                results.push(...processedData);
            }
        }

        dispatch(shoeComparisonCall(results));

    }

    useEffect(() => {
        if (callType === 'catalog') {
            catalogAPICall()
        }
    }, [newSearchHappened]);

    useEffect(() => {
        if (callType === 'comparison') {
            comparisonAPICall()
        }
    }, [shoe]);

}