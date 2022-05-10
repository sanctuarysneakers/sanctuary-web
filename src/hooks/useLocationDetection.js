import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLocation, updateCurrency } from '../redux/actions'
import { supportedCurrencies } from '../assets/constants'

export async function getLocation() { 
	const response = await fetch('https://hdwj2rvqkb.us-west-2.awsapprunner.com/location')
	const data = await response.json()	
	return data 
}

export function useLocationDetection() {

	const dispatch = useDispatch()

    const location = useSelector(state => state.location)

	useEffect(() => {
		async function fetchLocation() {
			let data = await getLocation()
			
			dispatch(updateLocation(data))
			if (data['country_code'] !== 'US' && supportedCurrencies.includes(data['currency_code'])) {
				dispatch(updateCurrency(data['currency_code']))
			}
		}

		if (location === null) {
			fetchLocation()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

}