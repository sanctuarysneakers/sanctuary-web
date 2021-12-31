import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize } from '../redux/actions'

export default function ItemCard({ data }) {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)
    const size = useSelector(state => state.size)

	const currencySymbolMap = {
		'AUD':'A$', 'CAD':'C$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'USD':'$'
    }

    const clickHandler = () => {
        if (size < 7 && data['gender'] === 'men')
			dispatch(updateSize(7))
		else if (size > 12 && data['gender'] === 'women')
			dispatch(updateSize(12))
        
        let itemId = data['sku'] ? data['sku'].split('/')[0] : data['urlKey']
        document.location.href = `/item/${itemId}/${data['gender']}`
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
