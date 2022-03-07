import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'
import { websiteLogoMapRegular, websiteTextMap, currencySymbolMap}  from '../assets/constants'

export default function ItemPrice({ data, index, length }) {

    const currency = useSelector(state => state.currency)

    const clickHandler = (url) => {
        window.analytics.track(`item_lowest_prices_click_${data.source}`, {url: data.url, price: data.price});
        window.open(url, '_blank')
    }

    return (
        <div className={(index === length - 1) ? 'item-price last' : 'item-price'}>

            <a onClick={() => clickHandler(data.url)}>
                <div className='item-price-source'>
                    <div className={`item-source-logo ${data.source}`}>
                        <img src={websiteLogoMapRegular[data.source]} alt='website logo' />
                    </div>

                    <div className='item-source-text'>
                        <h2> {websiteTextMap[data.source]} </h2>
                        <p> New </p>
                    </div>
                </div>

                <div className='item-price-link'>
                    <div className='item-amount'>
                        <div className='item-price-amount'>
                            <h2> {currencySymbolMap[currency]}{data.price} </h2>
                        </div>
                        <div className='item-shipping'>
                            { !isNaN(data.shippingPrice) && 
                            <p> +{currencySymbolMap[currency]}{Math.round(data.shippingPrice * 100) / 100} shipping</p>
                            }
                        </div>
                    </div>
                    <RightArrow />
                </div>
            </a>

        </div>
    )
}
