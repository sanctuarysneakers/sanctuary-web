import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemData } from '../../redux/actions'
import createRequestObject from './createrequest'
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

    async function getItemInfo(itemKey) {
        const request = createRequestObject('browse', {search: itemKey})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let itemData = await response.json()
            return {
                skuId: itemData[0]['sku'],
                modelName: itemData[0]['model'],
                image: itemData[0]['image']
            }
        } catch (e) {
            history.push(`/page-not-found`)
        }
    }

    async function getItemPrices(item, size) {
        const currencyRate = await currencyConversionRate("USD", currency)
        const klektCurrencyRate = await currencyConversionRate("EUR", currency)
        let results = []
        results.push(...await stockxLowestPrice(item.skuId, item.modelName, size, currencyRate))
        results.push(...await goatLowestPrice(item.skuId, item.modelName, size, currencyRate))
        results.push(...await flightclubLowestPrice(item.skuId, item.modelName, size, currencyRate))
        results.push(...await klektLowestPrice(item.skuId, item.modelName, size, klektCurrencyRate))
        if (typeof(location["country_code2"]) != "undefined") {
            results.push(...await ebayLowestPrice(item.skuId, item.modelName, size, location["country_code2"], currencyRate))
        } else {
            results.push(...await ebayLowestPrice(item.skuId, item.modelName, size, "US", currencyRate))
        }
        return results
    }

    async function getItemListings(item, size) {
        const currencyRate = await currencyConversionRate("USD", currency)
        let results = []
        if (typeof(location["country_code2"]) != "undefined") {
            results.push(...await ebayListings(item.skuId, item.modelName, size, location["country_code2"], currencyRate))
        } else {
            results.push(...await ebayListings(item.skuId, item.modelName, size, "US", currencyRate))
        }
        results.push(...await depopListings(item.modelName, size, currencyRate))
        results.push(...await grailedListings(item.modelName, size, currencyRate))
        results.sort((a, b) => a.price - b.price)
        return results
    }

    async function getItem(itemKey, size) {
        const itemInfo = await getItemInfo(itemKey)
        const itemPrices = await getItemPrices(itemInfo, size)
        const itemListings = await getItemListings(itemInfo, size)
        dispatch(updateItemData({
            info: itemInfo,
            prices: itemPrices,
            listings: itemListings
        }))
    }

    useEffect(() => {
        if (callType === 'browse')
            browse(params.query)
    }, [])

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.itemKey, params.size)
    }, [currency, size])

}