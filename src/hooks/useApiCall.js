import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings, 
    setItemPricesLoading, setItemListingsLoading, trendingCall, 
    under200Call, under300Call, updateRelatedItems, setRelatedItemsLoading } from '../redux/actions'
import createRequestObject from '../api/createRequest'
import { getItemInfo, getItemPrices, getItemListings, getRelatedItems } from '../api/aggregator'
import { SafePromiseAll } from '../api/helpers'
import { getLocation }  from '../hooks/useLocationDetection' 

export default function useAPICall(callType, params) {
    
    const history = useHistory()
    const dispatch = useDispatch()
    
    const location = useSelector(state => state.location)
    const size = useSelector(state => state.size)
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
            size: size, 
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
            results = results.filter(item => 
                !item["model"].includes("(GS)") 
                && !item["model"].includes("(TD)") 
                && !item["model"].includes("(PS)"))

            dispatch(dispatch_map[type](results))
        } catch (e) {
            dispatch(dispatch_map[type](false))
        }
    }

    async function getItem(params) {
        if (!location)
            location = await getLocation() 

        let itemInfo = params.fromBrowse ? params.fromBrowse : await getItemInfo(params.itemKey, params.gender)
        if (!itemInfo)
            history.replace('/item-not-supported')
        dispatch(updateItemInfo(itemInfo))

        let results = await SafePromiseAll([
            getItemPrices(itemInfo, size, params.gender, currency, location),
            getItemListings(itemInfo, size, params.gender, currency, location),
            getRelatedItems(itemInfo, currency)
        ], [])

        dispatch(updateItemPrices(results[0]))
        dispatch(updateItemListings(results[1]))
        dispatch(updateRelatedItems(results[2]))
	    dispatch(setItemPricesLoading(false))
	    dispatch(setItemListingsLoading(false))
        dispatch(setRelatedItemsLoading(false))
    }

    useEffect(() => {
        if (callType === 'getitem') {
            getItem(params)
        } else {
            browse(callType, params.query)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, size])

}
