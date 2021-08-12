import React, { useRef } from 'react'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { hideLocationPopup, updateCurrency } from '../redux/actions'
import { ReactComponent as Close } from '../assets/images/close.svg'
import Australia from '../assets/images/australia.svg'
import Canada from '../assets/images/canada.svg'
import EuropeanUnion from '../assets/images/europeanUnion.svg'
import Japan from '../assets/images/japan.svg'
import UnitedKingdom from '../assets/images/unitedKingdom.svg'


export default function LocationPopup() {

	const currency = useSelector(state => state.locationPopup)
	const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

	const currencyFlagMap = {
		'AUD' : Australia,
        'CAD' : Canada,
		'EUR' : EuropeanUnion,
        'JPY' : Japan,
        'GBP' : UnitedKingdom,
    }

	const handleCurrencyChange = () => {
		dispatch(updateCurrency(currency))
		dispatch(hideLocationPopup())
	}
	
	return (
		<div className='location-popup'>
			<div className='location-popup-content' ref={wrapperRef}>
				<div className='location-popup-padding'>
					<div className='location-popup-close'>
						<button onClick={() => dispatch(hideLocationPopup())}>
							<Close />
						</button>
					</div>

					<div className='location-popup-flag'>
						<img src={currencyFlagMap[currency]} alt='flag' />
					</div>

					<div className='location-popup-text'>
						<h1> Change Currency? </h1>
						<p> {`Would you like \n to change to ${currency}?`} </p>
					</div>

					<div className='location-popup-buttons'>
						<button className='location-popup-change' onClick={handleCurrencyChange}>
							Change currency
						</button>

						<button className='location-popup-cancel' onClick={() => dispatch(hideLocationPopup())}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}







// import React, { useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { hideLocationPopup, updateCurrency } from '../redux/actions'
// import useOutsideAlerter from './Hooks/useOutsideAlerter'
// import canada from '../assets/images/ca.svg'
// import japan from '../assets/images/jp.svg'
// import europeanUnion from '../assets/images/eu.svg'
// import unitedKingdom from '../assets/images/gb.svg'
// import australia from '../assets/images/au.svg'

// export default function LocationPopup() {

// 	const dispatch = useDispatch()

// 	const currency = useSelector(state => state.locationPopup)

// 	const currencyMap = {
// 		'CAD' : 'CA$',
// 		'EUR' : '€',
// 		'GBP' : '£',
// 		'JPY' : '¥',
// 		'AUD' : 'A$',
// 	}
// 	const flagMap = {
// 		'CAD' : canada,
// 		'EUR' : europeanUnion,
// 		'GBP' : unitedKingdom,
// 		'JPY' : japan,
// 		'AUD' : australia,
// 	}

// 	const handleCurrencyChange = () => {
// 		dispatch(updateCurrency(currency))
// 		dispatch(hideLocationPopup())
// 	}

// 	const wrapperRef = useRef(null)
// 	useOutsideAlerter(wrapperRef)

// 	return (
// 		<div className='modal-location'>
// 			<div className='location-popup' ref={wrapperRef}>
// 				<div className='card-one-location'>
// 					<div className='card-one-content'>
// 						<img src={flagMap[currency]} alt='flag' />
// 						<div className='card-one-title'>
// 							<h1> Change currency to {currencyMap[currency]}? </h1>
// 						</div>
// 						<div className='button-container'>
// 							<button className='no-change-button'
// 								onClick={() => dispatch(hideLocationPopup())}>
// 								Don't change
// 							</button>
// 							<button className='change-button'
// 								onClick={handleCurrencyChange}>
// 								Change to {currencyMap[currency]}
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
