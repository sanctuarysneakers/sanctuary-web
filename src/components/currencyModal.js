import React, { useRef } from 'react'
import CurrencyOption from './currencyOption'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { hideCurrencyModal } from '../redux/actions'
import { ReactComponent as Close } from '../assets/images/close.svg'

export default function CurrencyModal() {

    const currency = useSelector(state => state.currency)
    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    const countries = ['AUD', 'CAD', 'EUR', 'GBP', 'JPY', 'USD']

    const currencyOptions = countries.map((country) => 
        <CurrencyOption option={country} currency={currency} />
    )

    return (
        <div className='currency-modal'>
            <div className='currency-modal-content' ref={wrapperRef}>
                <div className='currency-modal-padding'>
                    <div className='currency-modal-close'>
						<button onClick={() => dispatch(hideCurrencyModal())}>
							<Close />
						</button>
					</div>

                    <div className='currency-modal-text'>
                        <h1> Change currency </h1>
                        <p> Select </p>
                    </div>

                    <div className='currency-modal-buttons'>
                        {currencyOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}
