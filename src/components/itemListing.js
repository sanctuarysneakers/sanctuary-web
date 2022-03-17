import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'
import { websiteTextMap, currencySymbolMap } from '../assets/constants'

export default function ItemListing({ data, index, length }) {

    const currency = useSelector(state => state.currency)

    let condition
    if (data.source === 'ebay') {
        try {
            condition = data.condition[0].conditionDisplayName[0]    
        } catch(e) {
            condition = 'Used'
        }
    } else {
          condition = 'Used'
    }

    const clickHandler = (url) => {
        window.analytics.track(`item_more_listings_click_${data.source}`, {url: data.url, price: data.price});
        window.open(url, '_blank')
    }
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
        <div className={(index === length - 1) ? 'item-listing last' : 'item-listing'}>

            <a onClick={() => clickHandler(data.url)}>
                <div className='item-listing-source'>
                    <div className='item-listing-image'>
                        <img src={data.image} alt='the sneaker' />
                    </div>
                    <div className='item-listing-text'>
                        <h2> {websiteTextMap[data.source]} </h2>
                        <p> {condition} </p>
                    </div>
                </div>

                <div className='item-listing-link'>
                    <div className='item-listing-amount'>
                        <h2>
                            {currencySymbolMap[currency]}{data.price}
                        </h2>
                        <div className='listing-shipping'>
                            { (data.shippingPrice === 0) && 
                            <p> FREE shipping</p>
                            }
                            { !isNaN(data.shippingPrice) && data.shippingPrice !== 0 && 
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