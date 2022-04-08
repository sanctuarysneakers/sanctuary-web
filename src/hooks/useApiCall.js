import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { browseCall, updateItemInfo, trendingCall, under200Call, under300Call, updateItemPrices, setItemPricesLoading, updateItemListings, setItemListingsLoading } from '../redux/actions'

import createRequestObject from '../api/createRequest'
import { getItemInfo, getItemPrices, getItemListings } from '../api/api' 
import { currencyConversionPromise } from '../helpers/index'

export default function useAPICall(callType, params) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const location = useSelector(state => state.location)
    const size = useSelector(state => state.item.size)
    const currency = useSelector(state => state.currency)


    function SafePromiseAll(promises, def = null) {
        return Promise.all(
            promises.map(p => p.catch(error => def))
        )
    }

    async function browse(type, query) {
        const price_limit = {
            'browse': null,
            'trending': null,
            'under200': 200,
            'under300': 300
        }
        const dispatch_map = {
            'browse': browseCall,
            'trending': trendingCall,
            'under200': under200Call,
            'under300': under300Call
        }

        let filters = {
            currency, 
            search: query,
            maxPrice: price_limit[type]
        }

        if(type === 'trending') {
            filters.sort = "most-active"
        }

        const request = createRequestObject('browse', filters)

        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()
            
            let results = await response.json()
            if (!results.length) throw new Error()

            dispatch(dispatch_map[type](results))
        } catch (e) {
            dispatch(dispatch_map[type](false))
        }
    }

    async function getItem(sku, size, gender, fromBrowse=null) {
        try {
            let shippingRequest = createRequestObject('shippingPrices', {country: location['country_code']})
        
            let prepRes = await SafePromiseAll([
                fromBrowse == null ? getItemInfo(sku, size, gender): Promise.resolve(fromBrowse),
                currencyConversionPromise("USD", currency),
                currencyConversionPromise("EUR", currency), 
                fetch(shippingRequest.url, shippingRequest.headers) 
            ])
    
            let itemInfo, usdRate, eurRate, shippingResponse;
            itemInfo = prepRes[0]
            usdRate = prepRes[1]
            eurRate = prepRes[2]
            shippingResponse = prepRes[3]
    
            if (itemInfo) {
                if(fromBrowse == null) {
                    dispatch(updateItemInfo(itemInfo))
                } 
               
                let itemRes = await SafePromiseAll(
                    [
                        getItemPrices(itemInfo, size, gender, usdRate, eurRate, shippingResponse, location, currency),
                        getItemListings(itemInfo, size, gender, usdRate, location, currency)
                    ], 
                    []
                ) 
    
                dispatch(updateItemPrices(itemRes[0]))
                dispatch(setItemPricesLoading(false))
    
                dispatch(updateItemListings(itemRes[1]))
                dispatch(setItemListingsLoading(false))
            }
        } catch (error) {
            history.replace('/item-not-supported')
        }
    }

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size, params.gender, params.fromBrowse)
        else 
            browse(callType, params.query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, size])
}
