import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLocationPopup, updateCurrency } from '../redux/actions'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import { RiCloseLine } from 'react-icons/ri'

export default function LocationPopup() {

	const dispatch = useDispatch()

	const location = useSelector(state => state.locationPopup)

	const handleCurrencyChange = () => {
		dispatch(updateCurrency(location.currency))
		dispatch(hideLocationPopup())
	}

	const wrapperRef = useRef(null)
	useOutsideAlerter(wrapperRef)

	return (
		<div className='modal-location'>
			<div className='location-popup' ref={wrapperRef}>

				<div className='close-area-location'>
					<div className='closeButton'
						onClick={() => dispatch(hideLocationPopup())}>
						<RiCloseLine />
					</div>
				</div>

				<div className='card-one-location'>
					<div className='card-one-content'>
						<div className='card-one-title'>
							<h1>We see you're browsing from {location.country}.</h1>
						</div>
						<button onClick={handleCurrencyChange}>
							Change currency to {location.currency}
						</button>
						<button onClick={() => dispatch(hideLocationPopup())}>
							Don't change
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
