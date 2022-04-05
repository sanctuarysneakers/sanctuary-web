import React, { useRef } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { hideLocationPopup, updateCurrency } from '../../redux/actions'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { currencyFlagMap } from '../../assets/constants'


export default function LocationPopup() {

	const currency = useSelector(state => state.locationPopup)
	const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

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
