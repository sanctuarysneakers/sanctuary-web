import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { updateSize } from '../redux/actions'

export default function CarouselCard({ data, index, type, length }) {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)
    const size = useSelector(state => state.size)

    const currencySymbolMap = {
        'AUD': 'A$', 'CAD': 'C$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'USD': '$'
    }

    const clickHandler = () => {
        if (size < 7 && data['gender'] === 'men')
			dispatch(updateSize(7))
		else if (size > 12 && data['gender'] === 'women')
			dispatch(updateSize(12))

        let itemId = data['sku'] ? data['sku'].split('/')[0] : data['urlKey']
        window.analytics.track(`home_carousel_item_clicked`, {id: itemId, gender: data['gender']});
        document.location.href = `/item/${itemId}/${data['gender']}`
    }

    let position;
    if (index === 0)
        position = 'carousel-card start'
    else if (index === length - 1)
        position = 'carousel-card end'
    else position = 'carousel-card'

    return (
        <div className={position} onClick={clickHandler}>
            {(type === 'trending') && <div className='carousel-card-trending'>
                <div className='carousel-card-trending-sneaker'>
                    <img src={data.imageThumbnail} />
                </div>

                <div className='carousel-card-trending-text'>
                    <div className='carousel-card-trending-model'>
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