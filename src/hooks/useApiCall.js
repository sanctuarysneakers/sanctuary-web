import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings, 
    updateRelatedItems, setRelatedItemsLoading, setItemPricesLoading, setItemListingsLoading, trendingCall, 
    under200Call, under300Call } from '../redux/actions'
import { getLocation }  from '../hooks/useLocationDetection'
import createRequestObject from '../api/createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from '../api/scrapers'
import { SafePromiseAll} from '../helpers'

export default function useAPICall(callType, params) {
    
    const dispatch = useDispatch()
    const history = useHistory()
    
    let location = useSelector(state => state.location)
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
            results = results.filter(item => !item["model"].includes("(GS)") && !item["model"].includes("(TD)") && !item["model"].includes("(PS)"))

            dispatch(dispatch_map[type](results))
        } catch (e) {
            dispatch(dispatch_map[type](false))
        }
    }

    async function getItem(params) {
        if (location === null)
            location = await getLocation() 

        let itemInfo = params.fromBrowse ? params.fromBrowse : await getItemInfo(params.itemKey, params.gender)
        dispatch(updateItemInfo(itemInfo))

        await SafePromiseAll(
            [
                getItemPrices(itemInfo, params.size, params.gender),
                getItemListings(itemInfo, params.size, params.gender), 
                getRelatedItems(itemInfo)
            ], 
            []
        )
    }

    async function getItemInfo(itemKey, gender) {
        try {
            const request = createRequestObject('browse', {
                search: itemKey,
                gender: gender
            })

            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let results = await response.json()
            let itemInfo = extractItemInfo(results, itemKey)
 
            if(!itemInfo) 
                throw Error() 
    
            return {
                sku: itemInfo['sku'],
                modelName: itemInfo['model'],
                image: itemInfo['image'],
                url: itemInfo['url'], 
                urlKey: itemInfo['urlKey']
            }
        } catch (e) { 
            console.log(e)
            history.replace('/item-not-supported')
            return null
        }
    }

    function extractItemInfo(results, itemKey) {
        for (let x = 0; x < results.length; x++) {

            let resultItem = results[x]
            if (resultItem['sku'].replaceAll('-', ' ') === itemKey || resultItem['sku'] === itemKey || resultItem['sku'].includes(itemKey) || resultItem['urlKey'] === itemKey) {
                return resultItem
            } 

            // handles case where sku contains multiple skus separated by '/'
            let skus = resultItem['sku'].split('/') 

            //when searching by urlkey, the correct item info might not be the first result so need to loop through all
            for (var i=0; i < skus.length; i++) {
                skus[i] = skus[i].replaceAll('-', ' ')
                if (skus[i].includes(itemKey))
                    return resultItem
            }
        }
        
        return null 
    }

    async function getItemPrices(item, size, gender) {
        let filter = {
            size: size,
            gender: gender,
            country: location['country_code'],
            postalCode: location['postal_code'],
            currency: currency
        }

        const res = await SafePromiseAll(
            [
                stockxLowestPrice(item, filter),
                ebayLowestPrice(item, filter),
                flightclubLowestPrice(item, filter),
                goatLowestPrice(item, filter),
                klektLowestPrice(item, filter)
            ]
        )
        
        let results = res.flat()
        results = results.filter(r => r.price !== 0)
        results.sort((a, b) => a.price - b.price)

        dispatch(updateItemPrices(results))
        dispatch(setItemPricesLoading(false))

        return results
    }

    async function getItemListings(item, size, gender) {
        let filter = {
            size: size,
            gender: gender,
            country: location['country_code'],
            postalCode: location['postal_code'],
            currency: currency
        }

        const res = await SafePromiseAll(
            [
                ebayListings(item, filter), 
                depopListings(item, filter),
                grailedListings(item, filter)
            ]
        ) 

        let results = res.flat().sort((a, b) => a.price - b.price)
        dispatch(updateItemListings(results))
        dispatch(setItemListingsLoading(false))
        return results
    }

    async function getRelatedItems(item) {
        let search = item.urlKey
        const request = createRequestObject('related', { search, currency })

        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let results = await response.json()
            if (!results.length) throw new Error()
            results = results.filter(item => !item["model"].includes("(GS)") && !item["model"].includes("(TD)") && !item["model"].includes("(PS)"))

            dispatch(updateRelatedItems(results))
        } catch (e) {
            dispatch(updateRelatedItems([]))
        }

        setRelatedItemsLoading(false) 
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
