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


export async function getItemInfo(sku, size, gender) {

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
        url: itemData[0]['url'],
        shipping: itemData[0]['shipping']
    }
}

// export async function getItemPrices(item, size, gender, usdRate, eurRate, shippingResponse, location, currency) {
//     let shippingPrices = {} 
//     if(shippingResponse && shippingResponse.ok) {
//         shippingPrices = await shippingResponse.json()
//     }
  
//     const res = await SafePromiseAll(
//         [
//             SafePromiseAll(Object.values(shippingPrices).map(shippingObj => currencyConversionPromise(shippingObj['currency'], currency))),  
//             stockxLowestPrice(item, usdRate), 
//             ebayLowestPrice(item, size, location['country_code'], location['postal_code'], usdRate, currency),
//             flightclubLowestPrice(item, size, gender, usdRate),
//             goatLowestPrice(item, size, usdRate),
//             klektLowestPrice(item, size, eurRate)
//         ]
//     ) 
    
//     let convertedShippingCurrencies = res[0]
//     let results = res.splice(1).flat() 

//     if (shippingPrices !== {} && convertedShippingCurrencies && Object.keys(shippingPrices).length === convertedShippingCurrencies.length) {
//         for (var i = 0; i < Object.keys(shippingPrices).length; i ++) {
//             let key = Object.keys(shippingPrices)[i]
//             if (shippingPrices[key] != null && convertedShippingCurrencies[i] != null) {
//                 shippingPrices[key] = shippingPrices[key]["cost"] * convertedShippingCurrencies[i] 
//             }  
//         }

//         for (var j = 0; j < results.length; j++) {
//             if (results[j]['source'] in shippingPrices) {    
//                 results[j]['shippingPrice'] = shippingPrices[results[j]['source']] 
//             }
//         }
//     }

//     //filter results and return         
//     results = results.filter(r => r.price !== 0)
//     results.sort((a, b) => a.price - b.price)
//     return results
// }

export async function getItemPrices(item, size, gender, usdRate, eurRate, location, currency) {
    let filter = {
        size: size,
        gender: gender,
        country: location['country_code'],
        postalCode: location['postal_code'],
        currency: currency,
        usdRate: usdRate,
        eurRate: eurRate // for klekt
    }
  
    const res = await SafePromiseAll(
        [
            stockxLowestPrice(item, filter), 
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



// export async function getItemListings(item, size, gender, usdRate, location, currency) {        
//     //execute all listing requests simultaneously
//     const res = await SafePromiseAll(
//         [
//             ebayListings(item, size, location['country_code'], usdRate, currency, location['postal_code']), 
//             depopListings(item, size, gender, usdRate, location['country_code']),
//             grailedListings(item, size, usdRate, location['country_code'].toLowerCase())
//         ]
//     ) 

//     const results = res.flat().sort((a, b) => a.price - b.price)
//     return results
// }

export async function getItemListings(item, size, gender, usdRate, location, currency) {
    let filter = {
        size: size,
        gender: gender,
        country: location['country_code'],
        postalCode: location['postal_code'],
        currency: currency,
        usdRate: usdRate
    }

    const res = await SafePromiseAll(
        [
            ebayListings(item, filter), 
            depopListings(item, filter),
            grailedListings(item, filter)
        ]
    ) 

    let results = res.flat().sort((a, b) => a.price - b.price)
    return results
} 

