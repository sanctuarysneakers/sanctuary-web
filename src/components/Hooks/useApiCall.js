import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings, updateRate,
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
    const rate = useSelector(state => state.rate)

    console.log(size)
    async function currencyConversionRate(from, to) {
        const url = `https://sanctuaryapi.net/currencyrate?from_curr=${from}&to_curr=${to}`
        const response = await fetch(url)
        return await response.json()
    }

    async function updateCurrencyRate(to) {
        var data;
        while (true) {
            const url = `https://sanctuaryapi.net/currencyrate?from_curr=USD&to_curr=${to}`
            const response = await fetch(url)
            if (response.status === 200) {
                data = await response.json()
                break
            } else await new Promise(r => setTimeout(r, 500));
        }
        dispatch(updateRate(data))
    }

    async function convertResults(results) {
        for (let i = 0; i < results.length; i++) {
            if (!isNaN(rate))
                results[i]["lastSale"] = Math.round(results[i]["lastSale"] * rate)
            else
                results[i]["lastSale"] = "---"
        }
        return results
    }

    async function browse(query) {
        const request = createRequestObject('browse', {search: query})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()
            
            let results = await response.json()
            results = await convertResults(results)

            dispatch(browseCall(results))
        } catch (e) {
            history.replace(`/page-not-found`)
        }
    }

    async function trending() {
        const request = createRequestObject('browse', {search: ''})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()
            
            let results = await response.json()
            if (!results.length) throw new Error()
            results = await convertResults(results)
            dispatch(trendingCall(results))
        } catch (e) {
            dispatch(trendingCall(false))
        }
    }

    async function extendedBrowse(type) {
        var limit = (type === 'under200') ? 200 : 300
        const request = createRequestObject('extendedbrowse', {max_price: limit})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()
            
            let results = await response.json()
            if (!results.length) throw new Error()
            results = await convertResults(results)
            if (type === 'under200')
                dispatch(under200Call(results)) 
            else if (type === 'under300')
                dispatch(under300Call(results))
        } catch (e) {
            if (type === 'under200')
                dispatch(under200Call(false))  
            else if (type === 'under300')
                dispatch(under300Call(false))
        }
    }

    async function getItemInfo(sku, size) {
        try {
            const request = createRequestObject('stockx', {search: sku, size: size})
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
            try {
                const request = createRequestObject('stockxInfo', {search: sku})
                const response = await fetch(request.url, request.headers)
    
                let itemData = await response.json()
                return {
                    hasPrice: false,
                    modelName: itemData[0]['model'],
                    image: itemData[0]['image'],
                }
            } catch (e) {
                history.replace('/item-not-supported')
                return null
            }
        }
    }

    async function getItemPrices(item, size) {
        let currencyRate;
        if (currency !== "USD")
            currencyRate = await currencyConversionRate("USD", currency)
        else currencyRate = 1
        let klektCurrencyRate = await currencyConversionRate("EUR", currency)

        let results = []
        results.push(...await stockxLowestPrice(item, currencyRate))
        results.push(...await ebayLowestPrice(item, size, location['country_code'], currencyRate)) // update this line if womens sizes
        results.push(...await goatLowestPrice(item, size, currencyRate))
        results.push(...await flightclubLowestPrice(item, size, currencyRate))
        results.push(...await klektLowestPrice(item, size, klektCurrencyRate))
        
        results = results.filter(r => r.price !== 0)
        results.sort((a, b) => a.price - b.price)
        return results
    }

    async function getItemListings(item, size) {
        let currencyRate;
        if (currency !== "USD")
            currencyRate = await currencyConversionRate("USD", currency)
        else currencyRate = 1
        
        let results = []
        results.push(...await ebayListings(item, size, location['country_code'], currencyRate))
        results.push(...await depopListings(item, size, currencyRate))
        results.push(...await grailedListings(item, size, currencyRate))

        results.sort((a, b) => a.price - b.price)
        return results
    }

    async function getItem(sku, size) {
        const itemInfo = await getItemInfo(sku, size)
        dispatch(updateItemInfo(itemInfo))
        
        if (itemInfo) {
            const itemPrices = await getItemPrices(itemInfo, size)
            dispatch(updateItemPrices(itemPrices))
            dispatch(setItemPricesLoading(false))
    
            const itemListings = await getItemListings(itemInfo, size)
            dispatch(updateItemListings(itemListings))
            dispatch(setItemListingsLoading(false))
        }
    }

    useEffect(() => {
        updateCurrencyRate(currency)
    }, [currency])

    useEffect(() => {
        if (callType === 'browse') 
            browse(params.query)

        if (callType === 'trending')
            trending()

        if (callType === 'under300')
            extendedBrowse('under300')

        if (callType === 'under200')
            extendedBrowse('under200')
    }, [currency,rate])

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size)
    }, [currency, size])

}