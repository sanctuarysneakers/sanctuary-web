
export async function getCurrencyRate(currency) {
	const url = "https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=USD&to=" + currency;
	const response = await fetch(url, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "c799b6c79bmsh22a306cdcd27be8p1b7882jsnca195ac45bce",
			"x-rapidapi-host": "currency-exchange.p.rapidapi.com"
		}
	})
	const data = await response.json()
	return data
}

export async function getKlektCurrencyRate(currency) {
	const url = "https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=EUR&to=" + currency;
	const response = await fetch(url, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "c799b6c79bmsh22a306cdcd27be8p1b7882jsnca195ac45bce",
			"x-rapidapi-host": "currency-exchange.p.rapidapi.com"
		}
	})
	const data = await response.json()
	return data
}
