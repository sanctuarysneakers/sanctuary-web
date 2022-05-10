import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings, 
    setItemPricesLoading, setItemListingsLoading, trendingCall, 
    under200Call, under300Call } from '../redux/actions'
import createRequestObject from './createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'
import { getLocation }  from '../hooks/useLocationDetection'

export default function useAPICall(callType, params) {
    
    const history = useHistory()
    const dispatch = useDispatch()
    
    let location = useSelector(state => state.location)
    const size = useSelector(state => state.size)
    const currency = useSelector(state => state.currency)

    //browse filters
    const sort = useSelector(state => state.browse.filters.sort)
    const brand = useSelector(state => state.browse.filters.brand)
    const priceRanges = useSelector(state => state.browse.filters.priceRanges)
    const sizeTypes = useSelector(state => state.browse.filters.sizeTypes)
    const releaseYears = useSelector(state => state.browse.filters.releaseYears)


    function SafePromiseAll(promises, def = null) {
        return Promise.all(
            promises.map(p => p.catch(error => def))
        )
    }

    async function browse(type, searchTerm) {
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

        let params = {
            currency, 
            search: searchTerm,
            maxPrice: price_limit[type],
            size: size, 
            ship_to: location['country_code']
        }

        let request; 
        if(type === 'trending') {
            request = createRequestObject('browse', {...params, sort: "most-active"}) 
        } else if (type === 'under200') {
            request = createRequestObject('browse', params)
        } else if (type === 'under300') {
            request = createRequestObject('browse', {...params, priceRanges: ["range(200|300)"]})
        } else {
            let filters = {
                brand,
                priceRanges,
                gender: sizeTypes, 
                releaseYears
            }

            request = createRequestObject('browse', {...params, ...filters, ...JSON.parse(sort)})
        }
    
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

    async function getItem(params) {
        if (location === null)
            location = await getLocation() 

        let itemInfo = params.fromBrowse ? params.fromBrowse : await getItemInfo(params.itemKey, params.gender)
        dispatch(updateItemInfo(itemInfo))

        await SafePromiseAll(
            [
                getItemPrices(itemInfo, params.size, params.gender),
                getItemListings(itemInfo, params.size, params.gender)
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

            let itemData = await response.json()
            
            // handles case where sku contains multiple skus separated by '/'
            let skus = itemData[0]['sku'].split('/')
            let containsSku = false
            for (var i=0; i < skus.length; i++) {
                skus[i] = skus[i].replaceAll('-', ' ')
                if (skus[i].includes(itemKey))
                    containsSku = true
            }
            if (!containsSku && !itemData[0]['urlKey'].includes(itemKey))
                throw new Error()
            
            return {
                sku: skus.length === 1 ? skus[0] : "",
                modelName: itemData[0]['model'],
                image: itemData[0]['image'],
                url: itemData[0]['url']
            }
        } catch (e) { 
            history.replace('/item-not-supported')
            return null
        }
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

    useEffect(() => {
        if (callType === 'getitem') {
            getItem(params)
        } else {
            browse(callType, params.query)
        }

        if (firstUpdate.current)
            firstUpdate.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, size, sort, brand, priceRanges, sizeTypes, releaseYears])

}
