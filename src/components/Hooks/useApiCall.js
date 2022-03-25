import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings,
    setItemPricesLoading, setItemListingsLoading, trendingCall, 
    under200Call, under300Call } from '../../redux/actions'
import createRequestObject from './createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'

export default function useAPICall(callType, params) {
    
    const history = useHistory()
    const dispatch = useDispatch()
    
    const location = useSelector(state => state.location)
    const size = useSelector(state => state.size)
    const currency = useSelector(state => state.currency)

    //browse filters
    const sort = useSelector(state => state.browseFilters.sort)
    const brand = useSelector(state => state.browseFilters.brand)
    const priceRanges = useSelector(state => state.browseFilters.priceRanges)
    const sizeTypes = useSelector(state => state.browseFilters.sizeTypes)
    const releaseYears = useSelector(state => state.browseFilters.releaseYears)

    async function currencyConversionRate(from, to) {
        const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/currencyrate2?from_curr=${from}&to_curr=${to}`
        const response = await fetch(url)
        return await response.json()
    }

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
        }

        let request; 
        if(type == 'browse') {

            let params = {
                currency, 
                search: searchTerm,
                maxPrice: price_limit[type], 
                brand,
                priceRanges,
                gender: sizeTypes, 
                releaseYears
            }

            request = createRequestObject('browse', {...params, ...filters, ...JSON.parse(sort)})
        } else if(type == 'trending') {
            request = createRequestObject('browse', {...params, sort: "most-active"}) 
        } else {
            request = createRequestObject('browse', params)
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
           
            await SafePromiseAll(
                [
                    getItemPrices(itemInfo, size, gender, usdRate, eurRate, shippingResponse),
                    getItemListings(itemInfo, size, gender, usdRate)
                ], 
                []
            ) 
        }
    }

    async function getItemInfo(sku, size, gender) {
        try {
            const request = createRequestObject('stockx', {search: sku, size: size, gender: gender})
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let itemData = await response.json()
            if (!itemData[0]['sku'].includes(sku)) throw new Error()
            return {
                hasPrice: true,
                skuId: sku.replaceAll('-', ' '),
                modelName: itemData[0]['model'],
                price: itemData[0]['price'],
                image: itemData[0]['image'],
                url: itemData[0]['url']
            }
        } catch (e) { 
            history.replace('/item-not-supported')
            return null
        }
    }

    async function getItemPrices(item, size, gender, usdRate, eurRate, shippingResponse) {
        let shippingPrices = {} 
        if(shippingResponse && shippingResponse.ok) {
            shippingPrices = await shippingResponse.json()
        }
      
        const res = await SafePromiseAll(
            [
                SafePromiseAll(Object.values(shippingPrices).map(shippingObj => currencyConversionPromise(shippingObj['currency'], currency))),  
                stockxLowestPrice(item, usdRate), 
                ebayLowestPrice(item, size, location['country_code'], location['postal_code'], usdRate, currency),
                flightclubLowestPrice(item, size, gender, usdRate),
                goatLowestPrice(item, size, usdRate),
                klektLowestPrice(item, size, eurRate)
            ]
        ) 
        
        let convertedShippingCurrencies = res[0]
        let results = res.splice(1).flat() 

        if (shippingPrices !== {} && convertedShippingCurrencies && Object.keys(shippingPrices).length === convertedShippingCurrencies.length) {
            for (var i = 0; i < Object.keys(shippingPrices).length; i ++) {
                let key = Object.keys(shippingPrices)[i]
                if (shippingPrices[key] != null && convertedShippingCurrencies[i] != null) {
                    shippingPrices[key] = shippingPrices[key]["cost"] * convertedShippingCurrencies[i] 
                }  
            }

            for (var j = 0; j < results.length; j++) {
                if (results[j]['source'] in shippingPrices) {    
                    results[j]['shippingPrice'] = shippingPrices[results[j]['source']] 
                }
            }
        }

        //filter results and return         
        results = results.filter(r => r.price !== 0)
        results.sort((a, b) => a.price - b.price)

        dispatch(updateItemPrices(results))
        dispatch(setItemPricesLoading(false))

        return results
    }

    async function getItemListings(item, size, gender, usdRate) {        
        //execute all listing requests simultaneously
        const res = await SafePromiseAll(
            [
                ebayListings(item, size, location['country_code'], usdRate, currency, location['postal_code']), 
                depopListings(item, size, gender, usdRate, location['country_code']),
                grailedListings(item, size, usdRate, location['country_code'].toLowerCase())
            ]
        ) 

        const results = res.flat().sort((a, b) => a.price - b.price)
        dispatch(updateItemListings(results))
        dispatch(setItemListingsLoading(false))
        return results
    }

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size, params.gender, params.fromBrowse)
        else
            browse(callType, params.query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, size, sort, brand, priceRanges, sizeTypes, releaseYears])

}
