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

    async function currencyConversionRate(from, to) {
        const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/currencyrate?from_curr=${from}&to_curr=${to}`
        const response = await fetch(url)
        return await response.json()
    }

    async function convertCurrency(results, currency) {
        const rate = await currencyConversionRate("USD", currency)
        for (let i = 0; i < results.length; i++)
            results[i]["price"] = !isNaN(rate) ? Math.round(results[i]["price"] * rate) : "---"
        return results
    }

    async function browse(type, query) {
        const price_limit = {
            'browse': 99999,
            'trending': 99999,
            'under200': 200,
            'under300': 300
        }
        const dispatch_map = {
            'browse': browseCall,
            'trending': trendingCall,
            'under200': under200Call,
            'under300': under300Call
        }

        const request = createRequestObject('browse', {
            search: query,
            max_price: price_limit[type]
        })

        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()
            
            let results = await response.json()
            if (!results.length) throw new Error()

            results = await convertCurrency(results, currency)

            dispatch(dispatch_map[type](results))
        } catch (e) {
            dispatch(dispatch_map[type](false))
        }
    }

    async function getItem(sku, size, gender, fromBrowse = null) {

        let itemInfo 
        if(fromBrowse != null) {
            itemInfo = fromBrowse
        } else {
            itemInfo = await getItemInfo(sku, size, gender)
        }

        dispatch(updateItemInfo(itemInfo))
        
        let currencyConversions = await Promise.all([
            currencyConversionRate("USD", currency), 
            currencyConversionRate("EUR", currency)
        ])
        
        if (itemInfo) {
            let res = await Promise.all(
                [
                    getItemPrices(itemInfo, size, gender, currencyConversions[0], currencyConversions[1]), 
                    getItemListings(itemInfo, size, gender, currencyConversions[0])
                ]
            ) 
    
            dispatch(updateItemPrices(res[0]))
            dispatch(setItemPricesLoading(false)) 

            dispatch(updateItemListings(res[1]))
            dispatch(setItemListingsLoading(false))
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

    async function getItemPrices(item, size, gender, usdRate, eurRate) {
        let shippingRequest = createRequestObject('shippingPrices', {country: location['country_code']})

        let res = await Promise.all(
            [
                fetch(shippingRequest.url, shippingRequest.headers),
                stockxLowestPrice(item, usdRate), 
                ebayLowestPrice(item, size, location['country_code'], location['postal_code'], usdRate, currency),
                flightclubLowestPrice(item, size, gender, usdRate),
                goatLowestPrice(item, size, usdRate),
                klektLowestPrice(item, size, eurRate)
            ]
        )
        let combinedRes = res.flat(); 
        let shippingResponse = combinedRes[0]
        let results = combinedRes.splice(1)

        if(shippingResponse && shippingResponse.ok) {
            const shippingPrices = await shippingResponse.json()

            let convertedShippingCurrencies = await Promise.all(
                Object.values(shippingPrices).map(shippingObj => currencyConversionRate(shippingObj['currency'], currency))  
            ) 

            for (var i = 0; i < Object.keys(shippingPrices).length; i ++) {
                let key = Object.keys(shippingPrices)[i]
                shippingPrices[key] = shippingPrices[key]["cost"] * convertedShippingCurrencies[i] 
            }

            for (var i = 0; i < results.length; i++) {
                if (results[i]['source'] in shippingPrices) {    
                    results[i]['shippingPrice'] = shippingPrices[results[i]['source']] 
                }
            }
        }

        //filter results and return         
        results = results.filter(r => r.price !== 0)
        results.sort((a, b) => a.price - b.price)

        return results
    }

    async function getItemListings(item, size, gender, usdRate) {        
        //execute all listing requests simultaneously
        const res = await Promise.all(
            [
                ebayListings(item, size, location['country_code'], usdRate, currency, location['postal_code']), 
                depopListings(item, size, gender, usdRate, location['country_code']),
                grailedListings(item, size, usdRate, location['country_code'])
            ]
        )

        const results = res.flat().sort((a, b) => a.price - b.price); 
        return results
    }

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size, params.gender, params.fromBrowse)
        else
            browse(callType, params.query)
    }, [currency, size])

}
