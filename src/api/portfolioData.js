import { SafePromiseAll } from './helpers'
import { getItemPrices } from './aggregator'

const api = 'https://hdwj2rvqkb.us-west-2.awsapprunner.com'
// const api = 'http://localhost:8000'

export async function getPortfolio (userID, currency, location) {
  const url = `${api}/portfolio?user_id=${userID}&currency=${currency}`
  const response = await fetch(url)

  let portfolio = await response.json()
  portfolio.forEach(item => { item.data = JSON.parse(item.data) })

  // add current price for each item
  const reqs = portfolio.map(item => getItemCurrentPrice(
    item, item.size, item.gender, currency, location))
  portfolio = await SafePromiseAll(reqs)

  return portfolio
}

async function getItemCurrentPrice (item, size, gender, currency, location) {
  const prices = await getItemPrices(item.data, size, gender, currency, location)
  item.currentPrice = prices[0].price
  return item
}

export async function addToPortfolio (data) {
  fetch(`${api}/portfolio`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export async function removeFromPortfolio (recordID) {
  fetch(`${api}/portfolio?record_id=${recordID}`, {
    method: 'DELETE'
  })
}
