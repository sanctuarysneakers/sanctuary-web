import React from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrency } from '../redux/actions'
import unitedStates from '../assets/images/unitedStates.svg'
import canada from '../assets/images/canada.svg'
import japan from '../assets/images/japan.svg'
import europeanUnion from '../assets/images/europeanUnion.svg'
import unitedKingdom from '../assets/images/unitedKingdom.svg'

export default function CurrencyFilter() {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)

    const currencyOptions = [
        { label: '$ USD', value: 'USD' },
        { label: '$ CAD', value: 'CAD' },
        { label: '¥ JPY', value: 'JPY' },
        { label: '€ EUR', value: 'EUR' },
        { label: '£ GBP', value: 'GBP' }
    ]

    const countryCurrencyMap = {
        'USD' : unitedStates,
        'CAD' : canada,
        'JPY' : japan,
        'EUR' : europeanUnion,
        'GBP' : unitedKingdom
    }

    const handleCurrencyChange = (e) => {
        const newCurrency = e.value
        dispatch(updateCurrency(newCurrency))
    }

    return (
        <div className='currency-filter'>
            <h4> Currency </h4>

            <div className='currency-filter-flag'>
                <img src={countryCurrencyMap[currency]} alt='flag' />
            </div>

            <Select
                className='currency-filter-content'
                classNamePrefix='currency-filter'
                isSearchable={false}
                menuPlacement={'top'}
                defaultValue={currencyOptions[0]}
                options={currencyOptions}
                onChange={handleCurrencyChange}
            />

        </div>
    )
}