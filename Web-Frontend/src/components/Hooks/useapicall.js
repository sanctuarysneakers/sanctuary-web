import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { browseCall } from '../../redux/actions'
import getCurrencyRate from './currencyrate'
import createRequestObject from './createrequest'
import { processItemData, processBrowseData } from './processdata'


export default function useAPICall(callType) {
    /* 
        callType is either 'catalog' or 'comparison' which indicates whether 
        the API call is being made to update the main catalog or if it is being 
        made to update the shoes for price comparison inside of a shoe modal.
    */

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const shoe = useSelector(state => state.shoe)
    const newSearchHappened = useSelector(state => state.newSearchHappened)
    const currency = useSelector(state => state.currency)

    async function browseAPICall() {
        const request = createRequestObject('browse', filter)
        const response = await fetch(request.url, request.headers)
        let rawData = await response.json()
        let processedData = processBrowseData(rawData)
        dispatch(browseCall(processedData))
    }

    // async function itemAPICall() {
    //     // Repeat the following request for all the sites and combine
    //     // all the data into one object to be processed and dispatched.
    //     // const stockxRequest = createRequestObject('stockx', shoe)
    //     // ...
    // }


    useEffect(() => {
        if (callType === 'browse')
            browseAPICall()
    }, [newSearchHappened])

    // useEffect(() => {
    //     if (callType === 'item')
    //         itemAPICall()
    // }, [shoe])

}