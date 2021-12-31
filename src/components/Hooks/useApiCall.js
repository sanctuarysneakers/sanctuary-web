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
            results[i]["lastSale"] = !isNaN(rate) ? Math.round(results[i]["lastSale"] * rate) : "---"
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

    async function getItem(sku, size, gender) {
        const itemInfo = await getItemInfo(sku, size, gender)
        dispatch(updateItemInfo(itemInfo))
        
        if (itemInfo) {
            const itemPrices = await getItemPrices(itemInfo, size, gender)
            dispatch(updateItemPrices(itemPrices))
            dispatch(setItemPricesLoading(false))
    
            const itemListings = await getItemListings(itemInfo, size, gender)
            dispatch(updateItemListings(itemListings))
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
            try {
                const request = createRequestObject('stockxInfo', {search: sku, gender: gender})
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

    async function getItemPrices(item, size, gender) {
        let currencyRate;
        if (currency !== "USD")
            currencyRate = await currencyConversionRate("USD", currency)
        else currencyRate = 1
        let klektCurrencyRate = await currencyConversionRate("EUR", currency)

        let results = []
        results.push(...await stockxLowestPrice(item, currencyRate))
        results.push(...await ebayLowestPrice(item, size, location['country_code'], currencyRate))
        results.push(...await goatLowestPrice(item, size, currencyRate))
        results.push(...await flightclubLowestPrice(item, size, gender, currencyRate))
        results.push(...await klektLowestPrice(item, size, klektCurrencyRate))
        
        results = results.filter(r => r.price !== 0)
        results.sort((a, b) => a.price - b.price)
        return results
    }

    async function getItemListings(item, size, gender) {
        let currencyRate;
        if (currency !== "USD")
            currencyRate = await currencyConversionRate("USD", currency)
        else currencyRate = 1
        
        let results = []
        results.push(...await ebayListings(item, size, location['country_code'], currencyRate))
        results.push(...await depopListings(item, size, gender, currencyRate))
        results.push(...await grailedListings(item, size, currencyRate))

        results.sort((a, b) => a.price - b.price)
        return results
    }

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size, params.gender)
        else
            browse(callType, params.query)
    }, [currency, size])

}
