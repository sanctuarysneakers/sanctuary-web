import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { browseCall, updateItemInfo, updateItemPrices, updateItemListings,
    setItemPricesLoading, setItemListingsLoading, trendingCall, 
    under200Call, under300Call, updatePortfolioData } from '../../redux/actions'
import createRequestObject from './createRequest'
import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, 
    klektLowestPrice, grailedListings, ebayListings, depopListings } from './scrapers'


export default function useAPICall(callType, params) {
    
    const history = useHistory()
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
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

    async function getItem(sku, size, gender) {
        const itemInfo = await getItemInfo(sku, size, gender)
        dispatch(updateItemInfo(itemInfo))
        
        if (itemInfo) {
            if(fromBrowse == null) {
                dispatch(updateItemInfo(itemInfo))
            } 
           
            await SafePromiseAll(
                [
                    getItemPrices(itemInfo, size, gender, usdRate, eurRate, shippingResponse, 'standard'),
                    getItemListings(itemInfo, size, gender, usdRate)
                ], 
                []
            ) 
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

    async function getItemPrices(item, size, gender, usdRate, eurRate, shippingResponse, type) {
        let shippingPrices = {} 
        if(shippingResponse && shippingResponse.ok && type === 'standard') {
            shippingPrices = await shippingResponse.json()
        }
        const res = await SafePromiseAll(
            [
                SafePromiseAll(Object.values(shippingPrices).map(shippingObj => currencyConversionPromise(shippingObj['currency'], currency))),  
                stockxLowestPrice(item, usdRate), 
                ebayLowestPrice(item, size, location['country_code'], location['postal_code'], usdRate, currency),
                flightclubLowestPrice(item, size, gender, usdRate),
                goatLowestPrice(item, size, usdRate),
                klektLowestPrice(item, size, eurRate)
            ]
        ) 

        let convertedShippingCurrencies = res[0]
        let results = res.splice(1).flat() 

        if (shippingPrices !== {} && convertedShippingCurrencies && Object.keys(shippingPrices).length === convertedShippingCurrencies.length) {
            for (var i = 0; i < Object.keys(shippingPrices).length; i ++) {
                let key = Object.keys(shippingPrices)[i]
                if (shippingPrices[key] != null && convertedShippingCurrencies[i] != null) {
                    shippingPrices[key] = shippingPrices[key]["cost"] * convertedShippingCurrencies[i] 
                }  
            }

            for (var j = 0; j < results.length; j++) {
                if (results[j]['source'] in shippingPrices) {    
                    results[j]['shippingPrice'] = shippingPrices[results[j]['source']] 
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
        if (type === 'standard') {
            dispatch(updateItemPrices(results))
            dispatch(setItemPricesLoading(false))  
        }
        return results
    }

    async function getItemListings(item, size, gender, usdRate) {       
        //execute all listing requests simultaneously
        const res = await SafePromiseAll(
            [
                ebayListings(item, size, location['country_code'], usdRate, currency, location['postal_code']), 
                depopListings(item, size, gender, usdRate, location['country_code']),
                grailedListings(item, size, usdRate, location['country_code'].toLowerCase())
            ]
        ) 

        const results = res.flat().sort((a, b) => a.price - b.price)
        dispatch(updateItemListings(results))
        dispatch(setItemListingsLoading(false))
        return results
    }
    async function getPortfolioData() {
        const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/accounts/portfolio/get?user_id=${user.uid}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    async function getPortfolio() {
        let shippingRequest = createRequestObject('shippingPrices', {country: location['country_code']})

        const prepRes = await SafePromiseAll([
            currencyConversionPromise("USD", currency),
            currencyConversionPromise("EUR", currency),    
            fetch(shippingRequest.url, shippingRequest.headers),
            getPortfolioData() 
        ])

        let usdRate, eurRate, shippingResponse, portfolioData
        usdRate = prepRes[0]
        eurRate = prepRes[1]
        shippingResponse = prepRes[2]
        portfolioData = prepRes[3]

        let shippingPrices
        if(shippingResponse && shippingResponse.ok) {
            shippingPrices = await shippingResponse.json()
        }

        for (var i = 0; i < portfolioData.length; i++) {
            let itemInfo = await SafePromiseAll([getItemInfo(portfolioData[i]['sku'].replace(/ /g,"-"), portfolioData[i]['size'], 'men')])
            let itemPrices = await SafePromiseAll([getItemPrices(itemInfo[0], portfolioData[i]['size'], 'men', usdRate, eurRate, shippingPrices, 'portfolio')])
            portfolioData[i]['itemInfo'] = itemInfo
            portfolioData[i]['currPrices'] = itemPrices
        }
        dispatch(updatePortfolioData(portfolioData))

    }

    useEffect(() => {
        if (callType === 'getitem')
            getItem(params.sku, params.size, params.gender)
        else if (callType === 'getportfolio')
            getPortfolio()
        else
            browse(callType, params.query)
    }, [currency, size])

}
