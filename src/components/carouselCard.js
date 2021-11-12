import React from "react";
import { useSelector } from 'react-redux'

export default function CarouselCard({ data, index, type, length }) {

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
		'AUD':'A$', 'CAD':'C$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'USD':'$'
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
        </div>
    )
}