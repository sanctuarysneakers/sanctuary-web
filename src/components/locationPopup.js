import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLocationPopup, updateCurrency } from '../redux/actions'
import useOutsideAlerter from './Hooks/useOutsideAlerter'

export default function LocationPopup() {

	const dispatch = useDispatch()

	const currency = useSelector(state => state.locationPopup)

	const currencyMap = {
		'CAD' : 'CA$',
		'EUR' : '€',
		'GBP' : '£',
		'JPY' : '¥',
		'AUD' : 'A$',
	}
	const flagMap = {
		'CAD' : '🇨🇦',
		'EUR' : '🇪🇺',
		'GBP' : '🇬🇧',
		'JPY' : '🇯🇵',
		'AUD' : '🇦🇺',
	}

	const handleCurrencyChange = () => {
		dispatch(updateCurrency(currency))
		dispatch(hideLocationPopup())
	}

	const wrapperRef = useRef(null)
	useOutsideAlerter(wrapperRef)

	return (
		<div className='modal-location'>
			<div className='location-popup' ref={wrapperRef}>
				<div className='card-one-location'>
					<div className='card-one-content'>
						<h1> {flagMap[currency]} </h1>
						<div className='card-one-title'>
							<h1> Change currency to {currencyMap[currency]}? </h1>
						</div>
						<div className='button-container'>
							<button className='no-change-button'
								onClick={() => dispatch(hideLocationPopup())}>
								Don't change
							</button>
							<button className='change-button'
								onClick={handleCurrencyChange}>
								Change to {currencyMap[currency]}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
