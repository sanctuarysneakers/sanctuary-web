import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItem, updatePrices, updateItemListings } from '../../redux/actions'
import createRequestObject from './createrequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, grailedLowestPrice, 
    ebayLowestPrice, depopLowestPrice, klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'
import getCurrencyRate from './currencyrate'


export default function useAPICall(callType) {

    const history = useHistory()

    const dispatch = useDispatch()
    const newSearchHappened = useSelector(state => state.newSearchHappened)
    const filter = useSelector(state => state.filter)
    const itemKey = useSelector(state => state.itemKey)
    const item = useSelector(state => state.item)
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
        const request = createRequestObject('browse', {search: itemKey})
        try {
            const response = await fetch(request.url, request.headers)
            let rawData = await response.json()
            let item = rawData['Products'][0]

            dispatch(updateItem({
                modelName: item['title'],
                skuId: item['styleId'],
                image: item['media']['imageUrl']
            }))
        } catch (e) {
            history.push(`/page-not-found`)
        }
    }


    async function getPrices() {
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
        dispatch(updatePrices(results))
    }


    async function getItemListings() {
        let results = []
        let size = 10
        let location = 'US'

        //TODO: convert currency
        results.push(...await grailedListings(item.modelName, size))
        results.push(...await ebayListings(item.skuId, item.modelName, size, location))
        results.push(...await depopListings(item.modelName, size))
        results.sort((a, b) => a.price - b.price)
        dispatch(updateItemListings(results))
    }


    useEffect(() => {
        if (callType === 'browse')
            browse()
    }, [newSearchHappened])

    useEffect(() => {
        if (callType === 'getiteminfo')
            getItemInfo()
    }, [itemKey])

    useEffect(() => {
        if (callType === 'getitemprices')
            getPrices()
    }, [item])

    useEffect(() => {
        if (callType === 'getitemlistings')
            getItemListings()
    }, [item])

}