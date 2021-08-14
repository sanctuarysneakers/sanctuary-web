import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings,
    setItemPricesLoading, setItemListingsLoading } from '../../redux/actions'
import createRequestObject from './createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'


export default function useAPICall(callType, params) {

    const history = useHistory()
    const dispatch = useDispatch()

    const currency = useSelector(state => state.currency)
    const location = useSelector(state => state.location)
    const size = useSelector(state => state.size)

    async function currencyConversionRate(from, to) {
        const url = `https://sanctuaryapi.net/currencyrate?from_curr=${from}&to_curr=${to}`
        const response = await fetch(url)
        return await response.json()
    }

    async function browse(query) {
        const request = createRequestObject('browse', {search: query})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()
            
            let results = await response.json()
            dispatch(browseCall(results))
        } catch (e) {
            history.replace(`/page-not-found`)
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
        results.push(...await ebayLowestPrice(item, size, location['country_code'], currencyRate))
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
        if (callType === 'browse')
            browse(params.query)
    }, [])

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size)
    }, [currency, size])

}