import { SafePromiseAll } from './helpers'
import { goatLowestPrice } from './dataSources'
import createRequestObject from './createRequest'

export async function getPortfolioData (userID, currency, location) {
  try {
    const request = createRequestObject('portfolio_get', {
      user_id: userID,
      currency
    })
    const response = await fetch(request.url, request.headers)

    let portfolio = await response.json()
    portfolio.forEach(item => { item.data = JSON.parse(item.data) })

    // Get current prices for each item
    const reqs = portfolio.map(item => itemWithCurrentPrice(
      item, item.size, item.gender, currency, location
    ))
    portfolio = await SafePromiseAll(reqs)

    return portfolio
  } catch (err) {
    console.log(err)
    return []
  }
}

export async function addToPortfolio (data) {
  try {
    const request = createRequestObject('portfolio_add', data)
    const response = await fetch(request.url, request.headers)
    return await response.text()
  } catch (err) {
    console.log(err)
  }
}

export async function removeFromPortfolio (recordId) {
  try {
    const request = createRequestObject('portfolio_remove', {
      record_id: recordId
    })
    return fetch(request.url, request.headers)
  } catch (err) {
    console.log(err)
  }
}

export function getPortfolioStatsWithAddedSneaker (portfolioStats, newPrice) {
  const newPortfolioStats = {
    total: portfolioStats.total + newPrice,
    priceChange: portfolioStats.priceChange,
    initialPrice: portfolioStats.initialPrice + newPrice,
    percentChange: (portfolioStats.priceChange / (portfolioStats.initialPrice + newPrice) * 100).toFixed(2)
  }
  return newPortfolioStats
}

export function getPortfolioStatsWithRemovedSneaker (portfolioStats, removedSneaker) {
  const newInitialPrice = portfolioStats.initialPrice - removedSneaker.price
  const newPortfolioStats = {
    total: portfolioStats.total - removedSneaker.currentPrice,
    priceChange: (portfolioStats.priceChange - (removedSneaker.currentPrice - removedSneaker.price)),
    initialPrice: newInitialPrice,
    percentChange: (newInitialPrice <= 0) ? 0 : (portfolioStats.priceChange / (newInitialPrice) * 100).toFixed(2)
  }
  return newPortfolioStats
}

export function getPortfolioStats (portfolio) {
  const portfolioStats = {
    total: 0,
    priceChange: 0,
    percentChange: 0,
    initialPrice: 0
  }

  if (portfolio) {
    for (const item of portfolio) {
      portfolioStats.total += item.currentPrice
      portfolioStats.initialPrice += item.price
      portfolioStats.priceChange += item.currentPrice - item.price
    }

    portfolioStats.percentChange = (
      portfolioStats.priceChange / portfolioStats.initialPrice * 100
    ).toFixed(2)
  }

  return portfolioStats
}

async function itemWithCurrentPrice (item, size, gender, currency, location) {
  const filter = {
    size,
    currency,
    country: location.country_code
  }
  const goatPriceObject = await goatLowestPrice(item.data, filter)
  item.currentPrice = goatPriceObject.price
  return item
}
