import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'
import { ReactComponent as Shipping } from '../../assets/images/shipping-icon.svg'
import { websiteTextMap, currencySymbolMap } from '../../assets/constants'

export default function ItemListing({ data, index, length }) {

    const currency = useSelector(state => state.currency)

    let condition
    if (data.source === 'ebay') {
        try {
            condition = data.condition[0].conditionDisplayName[0]
        } catch (e) {
            condition = 'Used'
        }
    } else {
        condition = 'Used'
    }

    const clickHandler = (url) => {
        window.analytics.track(`item_more_listings_click_${data.source}`, { url: data.url, price: data.price });
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

                        {data.shippingPrice !== null && <div className='listing-shipping'>
                            {data.shippingPrice === 0 &&
                                <div className='listing-shipping-text'>
                                    <Shipping />
                                    <p>Free</p>
                                </div>
                            }
                            {data.shippingPrice !== 0 &&
                                <div className='listing-shipping-text'>
                                    <Shipping />
                                    <p>{currencySymbolMap[currency]}{Math.round(data.shippingPrice)}</p>
                                </div>
                            }
                        </div>}

                    </div>
                    <RightArrow />
                </div>
            </a>

        </div>
    )
}