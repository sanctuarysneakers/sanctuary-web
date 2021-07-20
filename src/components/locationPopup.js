import React, { useRef } from 'react'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import { RiCloseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { hideLocationPopup, updateLocation, updateCurrency } from '../redux/actions'

export default function LocationPopup() {

    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    const country = useSelector(state => state.locationPopup['country_name'])
    const location = useSelector(state => state.locationPopup)
    useOutsideAlerter(wrapperRef)

    function handleChange() {
        dispatch(updateLocation(location))
        const countries = ['USD', 'CAD', 'JPY', 'EUR', 'GBP']
        if (countries.includes(location['currency_code'])) {
            dispatch(updateCurrency(location['currency_code']))
        }
        dispatch(hideLocationPopup())
    }

    function handleNoChange() {
        dispatch(hideLocationPopup())
    }

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
                            <h1>We see you're browsing from {country}.</h1>
                        </div>
                            <button onClick={handleChange}> Set my location to {country} </button>
                            <button onClick={handleNoChange}> Leave my location as USA </button>
                    </div>
                </div>
            </div>
        </div>
    )
}