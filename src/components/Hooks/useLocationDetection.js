import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showLocationPopup, updateLocation } from '../../redux/actions'

export default function useLocationDetection() {

	const dispatch = useDispatch()

    const location = useSelector(state => state.location)
	const currencies = ['USD','CAD','JPY','EUR','GBP','AUD']

	async function getLocation() { 
		const response = await fetch('https://hdwj2rvqkb.us-west-2.awsapprunner.com/location')
		const data = await response.json()
		dispatch(updateLocation(data))

		// show popup to suggest currency change depending on location
		if (data['country_code'] !== 'US' && currencies.includes(data['currency_code']))
			dispatch(showLocationPopup(data['currency_code']))
	}

	useEffect(() => {
		if (location === null)
			getLocation()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

}