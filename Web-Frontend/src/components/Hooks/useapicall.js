import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemData } from '../../redux/actions'
import { getCurrencyRate, getKlektCurrencyRate } from './currencyrate'
import createRequestObject from './createrequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'


export default function useAPICall(callType, params) {
    const history = useHistory()
    const dispatch = useDispatch()

    const currency = useSelector(state => state.currency)
    const location = useSelector(state => state.location)
    const size = useSelector(state => state.size)

    async function browse(query) {
        const request = createRequestObject('browse', {search: query})
        try {
            const response = await fetch(request.url, request.headers)
            if (!response.ok) throw new Error()

            let results = await response.json()
            // let results = []
            // for (const item of rawData['Products']) {
            //     if (results.length >= itemLimit) break
            //     results.push({
            //         id: item['id'],
            //         model: item['title'],
            //         urlKey: item['urlKey'],
            //         imageThumbnail: item['media']['imageUrl'].split('?', 1)[0] + '?w=300&q=50&trim=color'
            //     })
            // }
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
            let item = itemData[0]
            return {
                skuId: item['sku'],
                modelName: item['model'],
                image: item['image']
            }
        } catch (e) {
            history.push(`/page-not-found`)
        }
    }

    async function getItemPrices(item, size) {
        const currencyRate = await getCurrencyRate(currency)
        const klektCurrencyRate = await getKlektCurrencyRate(currency)
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
        const currencyRate = await getCurrencyRate(currency)
        let results = []
        if (typeof(location["country_code2"]) != "undefined") {
            results.push(...await ebayListings(item.skuId, item.modelName, size, location["country_code2"], currencyRate))
        } else {
            results.push(...await ebayListings(item.skuId, item.modelName, size, "US", currencyRate))
        }
        results.push(...await depopListings(item.modelName, size, currencyRate))
        results.push(...await grailedListings(item.modelName, size, 5, currencyRate))
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