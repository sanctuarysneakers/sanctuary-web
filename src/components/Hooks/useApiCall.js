import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings } from '../../redux/actions'
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
            history.push(`/page-not-found`)
        }
    }

    async function getItemInfo(sku, size) {
        const request = createRequestObject('stockx', {search: sku, size: size})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let itemData = await response.json()
            return {
                skuId: sku.replaceAll('-', ' '),
                modelName: itemData[0]['model'],
                price: itemData[0]['price'],
                image: itemData[0]['image'],
                url: itemData[0]['url']
            }
        } catch (e) {
            history.push(`/page-not-found`)
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
        results.push(...await goatLowestPrice(item.skuId, item.modelName, size, currencyRate))
        results.push(...await flightclubLowestPrice(item.skuId, item.modelName, size, currencyRate))
        results.push(...await klektLowestPrice(item.skuId, item.modelName, size, klektCurrencyRate))
        
        if (typeof(location["country_code2"]) !== "undefined")
            results.push(...await ebayLowestPrice(item.skuId, item.modelName, size, location["country_code2"], currencyRate))
        else
            results.push(...await ebayLowestPrice(item.skuId, item.modelName, size, "US", currencyRate))

        results.sort((a, b) => a.price - b.price)
        return results.length ? results : null
    }

    async function getItemListings(item, size) {
        let currencyRate;
        if (currency !== "USD")
            currencyRate = await currencyConversionRate("USD", currency)
        else currencyRate = 1
        
        let results = []
        results.push(...await depopListings(item.modelName, size, currencyRate))
        results.push(...await grailedListings(item.modelName, size, currencyRate))
        
        if (typeof(location["country_code2"]) !== "undefined")
            results.push(...await ebayListings(item.skuId, item.modelName, size, location["country_code2"], currencyRate))
        else
            results.push(...await ebayListings(item.skuId, item.modelName, size, "US", currencyRate))

        results.sort((a, b) => a.price - b.price)
        return results.length ? results : null
    }

    async function getItem(sku, size) {
        const itemInfo = await getItemInfo(sku, size)
        dispatch(updateItemInfo(itemInfo))
        
        const itemPrices = await getItemPrices(itemInfo, size)
        dispatch(updateItemPrices(itemPrices))

        const itemListings = await getItemListings(itemInfo, size)
        dispatch(updateItemListings(itemListings))
    }

    useEffect(() => {
        if (callType === 'browse')
            browse(params.query)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, size])

}