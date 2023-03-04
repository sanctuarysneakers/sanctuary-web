import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'
import { ReactComponent as Shipping } from '../../assets/images/shipping-icon.svg'
import { websiteLogoMapRegular, websiteTextMap, currencySymbolMap } from '../../assets/constants'

export default function ItemPrice({ data, index, length }) {

    const currency = useSelector(state => state.currency)

    /* eslint-disable jsx-a11y/anchor-is-valid */
    console.log(data.source)
    return (
        <div className={(index === length - 1) ? 'item-price last' : 'item-price'}>
            <Link to={{ pathname: data.url }} className="hidden-link" target="_blank" rel="noopener noreferrer"> 
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

                        {data.shipping !== null && <div className='item-shipping'>
                            {data.shipping === 0 && data.shipping !== null && 
                                <div className='item-shipping-text'>
                                    <Shipping />
                                    <p>Free</p>
                                </div>
                            }
                            {data.shipping !== 0 && data.shipping !== null && 
                                <div className='item-shipping-text'>
                                    <Shipping />
                                    <p>+{currencySymbolMap[currency]}{data.shipping}</p>
                                </div>
                            }
                        </div>}

                    </div>
                    <RightArrow />
                </div>
            </Link> 
        </div>
    )
}
