import { SafePromiseAll } from './helpers'
import { goatLowestPrice } from './dataSources'

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
  const filter = {
    size,
    gender,
    country: location.country_code,
    postalCode: location.postal_code,
    currency
  }
  const goatPriceObject = await goatLowestPrice(item.data, filter)
  item.currentPrice = goatPriceObject.price
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
