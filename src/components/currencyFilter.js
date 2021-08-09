import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCurrencyModal } from '../redux/actions'
import unitedStates from '../assets/images/unitedStates.svg'
import canada from '../assets/images/canada.svg'
import japan from '../assets/images/japan.svg'
import europeanUnion from '../assets/images/europeanUnion.svg'
import unitedKingdom from '../assets/images/unitedKingdom.svg'
import australia from '../assets/images/australia.svg'

export default function CurrencyFilter() {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)

    const currencyFlagMap = {
        'USD' : unitedStates,
        'CAD' : canada,
        'JPY' : japan,
        'EUR' : europeanUnion,
        'GBP' : unitedKingdom,
        'AUD' : australia,
    }

    return (
        <div className='currency-filter' onClick={() => dispatch(showCurrencyModal())}>
            <h4> Currency </h4>

            <div className='currency-filter-flag'>
                <img src={currencyFlagMap[currency]} alt='flag' />
            </div>
        </div>
    )
}