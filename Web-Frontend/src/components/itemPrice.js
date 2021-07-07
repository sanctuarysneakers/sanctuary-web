import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'

export default function ItemPrice({data}) {

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'USD' : '$',
        'CAD' : '$',
        'EUR' : '€',
        'GBP' : '£',
        'JPY' : '¥'
    }
    const currencySymbol = currencySymbolMap[currency]
    
    return (
        <div className='item-price'>
            <div className='item-price-source'>
                <div className='item-source-logo'>

                </div>
                <div className='item-source-text'>
                    <h2>
                        {data.source}
                    </h2>
                    <p>
                        New
                    </p>
                </div>
            </div>

            <div className='item-price-link'>
                <div className='item-amount'>
                    <h2>
                        {currencySymbol}{data.price}
                    </h2>
                </div>

                <RightArrow />
            </div>
        </div>
    )
}
