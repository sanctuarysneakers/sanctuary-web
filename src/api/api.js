import createRequestObject from './createRequest'

import { stockxLowestPrice, goatLowestPrice, flightclubLowestPrice, ebayLowestPrice, klektLowestPrice, grailedListings, ebayListings, depopListings } from '../api/scrapers'
import { SafePromiseAll, currencyConversionPromise } from '../helpers'


async function getPortfolioData(userID) {
    const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/accounts/portfolio/get?user_id=${userID}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function getPortfolioItemRequest(item, usdRate, eurRate, shippingPrices) {
    let itemInfo = await SafePromiseAll([getItemInfo(item['sku'].replace(/ /g,"-"), item['size'], 'men')])
    let itemPrices = await SafePromiseAll([getItemPrices(itemInfo[0], item['size'], 'men', usdRate, eurRate, shippingPrices, 'portfolio')])
    item['itemInfo'] = itemInfo
    item['currPrices'] = itemPrices

    return item
} 

export async function getPortfolio(userID, location, currency) {
    let shippingRequest = createRequestObject('shippingPrices', {country: location['country_code']})
    const prepRes = await SafePromiseAll([
        currencyConversionPromise("USD", currency),
        currencyConversionPromise("EUR", currency),    
        fetch(shippingRequest.url, shippingRequest.headers),
        getPortfolioData(userID) 
    ])

    let usdRate = prepRes[0]
    let eurRate = prepRes[1]
    let shippingResponse = prepRes[2]
    let portfolio = prepRes[3]

    let shippingPrices
    if(shippingResponse && shippingResponse.ok) {
        shippingPrices = await shippingResponse.json()
    }

    if(Array.isArray(portfolio)) {
        let reqs = portfolio.map(item => getPortfolioItemRequest(item, usdRate, eurRate, shippingPrices))     //construct array of requests 
        let portfolioWithPrices = await SafePromiseAll(reqs)     //execute requests in parallel 
        
        return portfolioWithPrices
    } else {
        return []
    }
}

export async function addToPortfolio(data) {
    try {
        fetch("https://hdwj2rvqkb.us-west-2.awsapprunner.com/accounts/portfolio/add", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
        throw new Error("Could not add shoe to portfolio")
    }
}

export async function removeFromPortfolio(data) {
    try {
        fetch("https://hdwj2rvqkb.us-west-2.awsapprunner.com/accounts/portfolio", {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data) 
        })
    } catch(error) {
        console.log(error)
        throw new Error("Could not remove from portfolio")
    }
   
} 


async function getItemInfo(sku, size, gender, location, currency) {
    try {
        const request = createRequestObject('browse', {
            search: sku,
            size: size,
            gender: gender,
            currency: currency,
            ship_to: location['country_code']
        })

        const response = await fetch(request.url, request.headers)
        if (!response.ok) throw new Error()

        let itemData = await response.json()
        if (!itemData[0]['sku'].includes(sku) && !itemData[0]['urlKey'].includes(sku))
            throw new Error()
        
        return {
            hasPrice: true,
            skuId: sku.replaceAll('-', ' '),
            modelName: itemData[0]['model'],
            price: itemData[0]['price'],
            image: itemData[0]['image'],
            url: itemData[0]['url'],
            shipping: itemData[0]['shipping2']
        }
    } catch(error) {
        history.replace('/item-not-supported')
    }
}

export async function getItemPrices(item, size, gender, location, currency) {
    let filter = {
        size: size,
        gender: gender,
        country: location['country_code'],
        postalCode: location['postal_code'],
        currency: currency
    }
  
    const res = await SafePromiseAll(
        [
            stockxLowestPrice(item),
            ebayLowestPrice(item, filter),
            flightclubLowestPrice(item, filter),
            goatLowestPrice(item, filter),
            klektLowestPrice(item, filter)
        ]
    )
    
    let results = res.flat()
    results = results.filter(r => r.price !== 0)
    results.sort((a, b) => a.price - b.price)

    dispatch(updateItemPrices(results))
    dispatch(setItemPricesLoading(false))

    return results
}

export async function getItemListings(item, size, gender, location, currency) {
    let filter = {
        size: size,
        gender: gender,
        country: location['country_code'],
        postalCode: location['postal_code'],
        currency: currency
    }

    const res = await SafePromiseAll(
        [
            ebayListings(item, filter), 
            depopListings(item, filter),
            grailedListings(item, filter)
        ]
    ) 

    let results = res.flat().sort((a, b) => a.price - b.price)
    dispatch(updateItemListings(results))
    dispatch(setItemListingsLoading(false))
    return results
}

