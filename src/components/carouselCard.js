import React from "react";
import { useSelector } from 'react-redux'

export default function CarouselCard({ data, index, type, length }) {

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'AUD': 'A$', 'CAD': 'C$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'USD': '$'
    }

    let position
    if (index === 0) {
        position = 'carousel-card start'
    } else if (index === length - 1) {
        position = 'carousel-card end'
    } else {
        position = 'carousel-card'
    }

    return (
        <div className={position}>
            {(type === 'trending') && <div className='carousel-card-trending'>
                <div className='carousel-card-trending-sneaker'>
                    <img src={data.imageThumbnail} />
                </div>

                <div className='carousel-card-trending-text'>
                    <div className='carousel-card-trending-text'>
                        <p>TRENDING</p>
                        <h2>{data.model}</h2>
                    </div>

                    <div className='carousel-card-trending-price'>
                        <p>Estimated</p>
                        <h4>{currencySymbolMap[currency]}{data.lastSale.toLocaleString('en')}</h4>
                    </div>
                </div>
            </div>}

            {(type === 'under200' || type === 'under300') && <div className='carousel-card-deals'>
                <div className='carousel-card-content'>
                    <div className='carousel-card-image'>
                        <img src={data.imageThumbnail} />
                    </div>

                    <div className='carousel-card-text'>
                        <p>TRENDING</p>
                        <h2>{data.model}</h2>
                    </div>

                    <div className='carousel-card-price'>
                        <p>Estimated</p>
                        <h4>{currencySymbolMap[currency]}{data.lastSale.toLocaleString('en')}</h4>
                    </div>
                </div>
            </div>}
        </div>
    )
}