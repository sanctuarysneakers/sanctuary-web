import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemData } from '../../redux/actions'
import createRequestObject from './createrequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, grailedLowestPrice, 
    ebayLowestPrice, depopLowestPrice, klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'
import getCurrencyRate from './currencyrate'


export default function useAPICall(callType, params) {

    const history = useHistory()
    const dispatch = useDispatch()

    const newSearchHappened = useSelector(state => state.newSearchHappened)
    //const itemHit = useSelector(state => state.itemHit)
    const filter = useSelector(state => state.filter)
    const currency = useSelector(state => state.currency)


    async function browse(itemLimit = 30) {
        const request = createRequestObject('browse', filter)
        const response = await fetch(request.url, request.headers)
        let rawData = await response.json()
        let results = []
        for (const item of rawData['Products']) {
            if (results.length >= itemLimit) break
            results.push({
                model: item['title'],
                urlKey: item['urlKey'],
                imageThumbnail: item['media']['imageUrl'].split('?', 1)[0] + '?w=300&q=50&trim=color'
            })
        }
        dispatch(browseCall(results))
    }

    
    async function getItemInfo() {
        const request = createRequestObject('browse', {search: params.itemKey})
        try {
            const response = await fetch(request.url, request.headers)
            let rawData = await response.json()
            let item = rawData['Products'][0]
            return {
                modelName: item['title'],
                skuId: item['styleId'],
                image: item['media']['imageUrl']
            }
        } catch (e) {
            history.push(`/page-not-found`)
        }
    }


    async function getItemPrices(item) {
        let results = []
        let size = 10
        let location = 'US'
        //TODO: convert currency
        results.push(...await stockxLowestPrice(item.skuId, size, currency))
        results.push(...await goatLowestPrice(item.skuId, size, currency))
        results.push(...await flightclubLowestPrice(item.skuId, size, currency))
        results.push(...await grailedLowestPrice(item.modelName, size, currency))
        results.push(...await klektLowestPrice(item.skuId, size, currency))
        results.push(...await ebayLowestPrice(item.skuId, item.modelName, size, location, currency))
        results.push(...await depopLowestPrice(item.modelName, size, currency))
        return results
    }


    async function getItemListings(item) {
        let results = []
        let size = 10
        let location = 'US'
        //TODO: convert currency
        results.push(...await grailedListings(item.modelName, size))
        results.push(...await ebayListings(item.skuId, item.modelName, size, location))
        results.push(...await depopListings(item.modelName, size))
        results.sort((a, b) => a.price - b.price)
        return results
    }


    async function getItem() {
        const itemInfo = await getItemInfo()
        const itemPrices = await getItemPrices(itemInfo)
        const itemListings = await getItemListings(itemInfo)
        dispatch(updateItemData({
            info: itemInfo,
            prices: itemPrices,
            listings: itemListings
        }))
    }


    useEffect(() => {
        if (callType === 'browse')
            browse()
    }, [newSearchHappened])

    useEffect(() => {
        if (callType === 'getitem')
            getItem()
    }, [])

}