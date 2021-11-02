import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function HomeCarouselCard({ data, type, index, length }) {
	const currency = useSelector(state => state.currency)
	const currencySymbolMap = {
		'AUD': 'A$', 'CAD': 'C$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'USD': '$'
	}

	const clickHandler = () => {
        if (data['sku'])
            document.location.href = `/item/${data['sku']}`
        else
            document.location.href = `/item/${data['urlKey']}`
	}

	return (
        <div className='home-item-card' onClick={clickHandler}>
        <div className='home-item-card-content'>
            <div className='home-item-card-sneaker'>
                <img src={data.imageThumbnail} loading='lazy' alt={data.model} />
            </div>

            <div className='home-item-card-text'>
                <h2> {data.model} </h2>

                <div className='home-item-card-estimated-price'>
                    <p className='home-item-card-estimated'>
                        EST. 
                    </p>

                    <p className='home-item-card-price'>
                        {currencySymbolMap[currency]} {data.lastSale}
                    </p>
                </div>
            </div>
        </div>
    </div>
	)
}