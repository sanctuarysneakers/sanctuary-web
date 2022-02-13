import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCurrencyModal } from '../redux/actions'
import { currencyFlagMap } from '../assets/constants'

export default function CurrencyFilter() {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)

    return (
        <div className='currency-filter' onClick={() => dispatch(showCurrencyModal())}>
            <h4> Currency </h4>

            <div className='currency-filter-flag'>
                <img src={currencyFlagMap[currency]} alt='flag' />
            </div>
        </div>
    )
}