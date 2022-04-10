// collection of helper functions used across multiple components  

export function SafePromiseAll(promises, def = null) {
    return Promise.all(
        promises.map(p => p.catch(error => def))
    )
}

export async function currencyConversionRate(from, to) {
    const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/currencyrate2?from_curr=${from}&to_curr=${to}`
    const response = await fetch(url)
    return await response.json()
}

export function currencyConversionPromise(from, to) {
    if (from !== to)
        return currencyConversionRate(from, to) 
    else
        return Promise.resolve(1)
}