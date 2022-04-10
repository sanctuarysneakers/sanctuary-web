import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { browseCall, updateItemInfo, trendingCall, under200Call, under300Call, updateItemPrices, setItemPricesLoading, updateItemListings, setItemListingsLoading } from '../redux/actions'

import createRequestObject from '../api/createRequest'
import { getItemInfo, getItemPrices, getItemListings } from '../api/api' 
import { currencyConversionPromise, SafePromiseAll } from '../helpers/index'

export default function useAPICall(callType, params) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const location = useSelector(state => state.location)
    const size = useSelector(state => state.item.size)
    const currency = useSelector(state => state.currency)

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
            search: query,
            currency: currency,
            maxPrice: price_limit[type],
            ship_to: location['country_code']
        }
        if (type === 'trending')
            filters.sort = "most-active"

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
            let prepRes = await SafePromiseAll([
                fromBrowse ? Promise.resolve(fromBrowse) : getItemInfo(sku, size, gender),
                currencyConversionPromise("USD", currency),
                currencyConversionPromise("EUR", currency), 
            ])
    
            let itemInfo, usdRate, eurRate;
            itemInfo = prepRes[0]
            usdRate = prepRes[1]
            eurRate = prepRes[2]
    
            if (itemInfo) {
                if (!fromBrowse)
                    dispatch(updateItemInfo(itemInfo))
               
                await SafePromiseAll(
                    [
                        getItemPrices(itemInfo, size, gender, usdRate, eurRate, location, currency).then(itemRes => {
                            dispatch(updateItemPrices(itemRes)) 
                            dispatch(setItemPricesLoading(false))
                        }) ,
                        getItemListings(itemInfo, size, gender, usdRate, location, currency).then(listingRes => {
                            dispatch(updateItemListings(listingRes))
                            dispatch(setItemListingsLoading(false))
                        })
                    ], 
                    []
                )     
            }
        } catch(error) {
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
