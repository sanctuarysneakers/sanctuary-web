import React, { useRef } from 'react'
import CurrencyOption from '../Currency/currencyOption'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { hideCurrencyModal } from '../../redux/actions'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { supportedCurrencies } from '../../assets/constants'

export default function CurrencyModal () {
  const currency = useSelector(state => state.currency)
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  useOutsideAlerter(wrapperRef)

  const currencyOptions = supportedCurrencies.map((country) =>
    <CurrencyOption key={country} option={country} currency={currency} />
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
