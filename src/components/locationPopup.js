import React, { useRef } from 'react'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import { RiCloseLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { hideLocationPopup } from '../redux/actions'
import Div100vh from 'react-div-100vh'
import { Helmet } from 'react-helmet'

export default function  () {

    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    return (
        <div className='modal-location'  ref={wrapperRef}>
            <div className='close-area-location'>
                <div className='closeButton'
                    onClick={() => dispatch(hideLocationPopup())}>
                    <RiCloseLine />
                </div>
            </div>
            <p> Hello, world!</p>
        </div>
    )
}