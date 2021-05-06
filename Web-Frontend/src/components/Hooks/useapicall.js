import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItem, updatePrices } from '../../redux/actions'
import createRequestObject from './createrequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, grailedLowestPrice, 
    ebayLowestPrice, depopLowestPrice, klektLowestPrice, sneakerconLowestPrice } from './scrapers'
import getCurrencyRate from './currencyrate'


export default function useAPICall(callType) {

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
        const response = await fetch(request.url, request.headers)
        let rawData = await response.json()
        let item = rawData['Products'][0]
        dispatch(updateItem({
            modelName: item['title'],
            skuId: item['styleId'],
            image: item['media']['imageUrl']
        }))
    }


    async function getPrices() {
        let results = []
        let size = 10
        results.push(await stockxLowestPrice(item.skuId, size, currency))
        results.push(await goatLowestPrice(item.skuId, size, currency))
        results.push(await flightclubLowestPrice(item.skuId, size, currency))
        results.push(await grailedLowestPrice(item.modelName, size, currency))
        results.push(await klektLowestPrice(item.skuId, size, currency))
        results.push(await ebayLowestPrice(item.skuId, item.modelName, size))
        results.push(await depopLowestPrice(item.modelName, size, currency))
        //results.push(await sneakerconLowestPrice(item.skuId, size, currency))
        dispatch(updatePrices(results))
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

}