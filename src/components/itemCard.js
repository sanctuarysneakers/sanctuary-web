import React from 'react'
import { useSelector } from 'react-redux'

export default function ItemCard({ data }) {

    const clickHandler = () => {
        let itemId = data['sku'] ? data['sku'].split('/')[0] : data['urlKey']
        document.location.href = `/item/${itemId}/${data['gender']}`
    }

    const currency = useSelector(state => state.currency)

	const currencySymbolMap = {
		'AUD':'A$', 'CAD':'C$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'USD':'$'
    }

    return (
        <div className='item-card' onClick={clickHandler}>
            <div className='item-card-content'>
                <div className='item-card-sneaker'>
                    <img src={data.imageThumbnail} loading='lazy' alt={data.model} />
                </div>

                <div className='item-card-text'>
                    <h2> {data.model} </h2>

                    <div className='item-card-estimated-price'>
                        <p className='item-card-estimated'>
                            Estimated 
                        </p>

                        <p className='item-card-price'>
                            {currencySymbolMap[currency]}{data.lastSale.toLocaleString('en')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
