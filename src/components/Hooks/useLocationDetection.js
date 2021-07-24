import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showLocationPopup } from '../../redux/actions'

export default function useLocationDetection() {

	const dispatch = useDispatch()

	const currency = useSelector(state => state.currency)
    const location = useSelector(state => state.location)

	async function detectLocation() { 
		const response = await fetch('https://sanctuaryapi.net/location')
		const data = await response.json()
		// if (data['country_code'] !== 'US' && data['country_code'] !== location['country_code']) {
		if (data['country_code'] !== 'US')
			dispatch(showLocationPopup(data))
	}

	useEffect(() => {
		detectLocation()
	}, [])

}