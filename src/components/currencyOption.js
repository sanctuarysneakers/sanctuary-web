import React from 'react'
import { useDispatch } from 'react-redux'
import { updateCurrency, setItemPricesLoading, setItemListingsLoading, hideCurrencyModal } from '../redux/actions'
import Australia from '../assets/images/australia.svg'
import Canada from '../assets/images/canada.svg'
import EuropeanUnion from '../assets/images/europeanUnion.svg'
import Japan from '../assets/images/japan.svg'
import UnitedKingdom from '../assets/images/unitedKingdom.svg'
import UnitedStates from '../assets/images/unitedStates.svg'

export default function CurrencyOption({ option, currency }) {

    const dispatch = useDispatch()

    const currencySymbolMap = {
        'AUD' : 'AUD - A$',
        'CAD' : 'CAD - C$',
        'EUR' : 'EUR - €',
        'GBP' : 'GBP - £',
        'JPY' : 'JPY - ¥',
        'USD' : 'USD - $'
    }

    const currencyFlagMap = {
		'AUD' : Australia,
        'CAD' : Canada,
		'EUR' : EuropeanUnion,
        'GBP' : UnitedKingdom,
        'JPY' : Japan,
        'USD' : UnitedStates
    }

    const handleCurrencyChange = () => {
        dispatch(updateCurrency(option))
        dispatch(hideCurrencyModal())
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))
    }

    return (
        <div className={(option === currency) ? 'currency-option current' : 'currency-option'}>

            <div className='currency-option-content' onClick={handleCurrencyChange}>
                <div className={(option === currency) ? 'currency-option-text current' : 'currency-option-text'}>
                    <img src={currencyFlagMap[option]} alt='flag' />
                    <p> {currencySymbolMap[option]} </p>
                </div>
            </div>

        </div>
    )
}
