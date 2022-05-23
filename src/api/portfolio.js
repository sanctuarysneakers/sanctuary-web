import { SafePromiseAll } from "./helpers"
import { getItemPrices } from "./aggregator"


//const api = 'https://hdwj2rvqkb.us-west-2.awsapprunner.com'
const api = 'http://localhost:8000'

export async function getPortfolio(userID, currency) {
	const url = `${api}/portfolio?user_id=${userID}&currency=${currency}`
	const response = await fetch(url)
	const portfolio = await response.json()
	return portfolio

	// if (Array.isArray(portfolio)) {
	// 	let reqs = portfolio.map(item => getPortfolioItemRequest(item))
	// 	let portfolioWithPrices = await SafePromiseAll(reqs)

	// 	return portfolioWithPrices
	// } else {
	// 	return []
	// }
}

// async function getPortfolioItemRequest(item) {
// 	let itemInfo = await getItemInfo(item['sku'].replace(/ /g,"-"), item['size'], 'men')
// 	let itemPrices = await getItemPrices(itemInfo[0], item['size'], 'men', 'portfolio')
// 	item['itemInfo'] = itemInfo
// 	item['currPrices'] = itemPrices
// 	return item
// }

export async function addToPortfolio(data) {
	fetch(`${api}/portfolio`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(data)
	})
}

export async function removeFromPortfolio(data) {
	fetch(`${api}/portfolio`, {
		method: "DELETE",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(data) 
	})
}