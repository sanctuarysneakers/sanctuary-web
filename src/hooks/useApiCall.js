import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings,
    setItemPricesLoading, setItemListingsLoading, trendingCall, 
    under200Call, under300Call } from '../redux/actions'
import createRequestObject from './createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'

export default function useAPICall(callType, params) {
    
    const history = useHistory()
    const dispatch = useDispatch()
    
    const location = useSelector(state => state.location)
    const size = useSelector(state => state.item.size)
    const currency = useSelector(state => state.currency)

    //browse filters
    const sort = useSelector(state => state.browse.filters.sort)
    const brand = useSelector(state => state.browse.filters.brand)
    const priceRanges = useSelector(state => state.browse.filters.priceRanges)
    const sizeTypes = useSelector(state => state.browse.filters.sizeTypes)
    const releaseYears = useSelector(state => state.browse.filters.releaseYears)

    async function currencyConversionRate(from, to) {
        const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/currencyrate2?from_curr=${from}&to_curr=${to}`
        const response = await fetch(url)
        return await response.json()
    }

    // why do we need this?
    function currencyConversionPromise(from, to) {
        if (from !== to)
            return currencyConversionRate(from, to) 
        else
            return Promise.resolve(1)
    }

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

    async function getItem(sku, size, gender, fromBrowse=null) {
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
                    getItemPrices(itemInfo, size, gender, usdRate, eurRate),
                    getItemListings(itemInfo, size, gender, usdRate)
                ], 
                []
            ) 
        }
    }

    async function getItemInfo(sku, size, gender) {
        try {
            const request = createRequestObject('stockx', {
                search: sku,
                size: size,
                gender: gender,
                ship_to: location['country_code']
            })

            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let itemData = await response.json()
            if (!itemData[0]['sku'].includes(sku))
                throw new Error()
            
            return {
                hasPrice: true,
                skuId: sku.replaceAll('-', ' '),
                modelName: itemData[0]['model'],
                price: itemData[0]['price'],
                image: itemData[0]['image'],
                url: itemData[0]['url'],
                shipping: itemData[0]['shipping']
            }
        } catch (e) { 
            history.replace('/item-not-supported')
            return null
        }
    }

    async function getItemPrices(item, size, gender, usdRate, eurRate) {
        let filter = {
            size: size,
            gender: gender,
            country: location['country_code'],
            postalCode: location['postal_code'],
            currency: currency,
            usdRate: usdRate,
            eurRate: eurRate // for klekt
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

    async function getItemListings(item, size, gender, usdRate) {
        let filter = {
            size: size,
            gender: gender,
            country: location['country_code'],
            postalCode: location['postal_code'],
            currency: currency,
            usdRate: usdRate
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
        if (callType === 'getitem')
            getItem(params.sku, params.size, params.gender, params.fromBrowse)
        else
            browse(callType, params.searchTerm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, size, sort, brand, priceRanges, sizeTypes, releaseYears])

}
