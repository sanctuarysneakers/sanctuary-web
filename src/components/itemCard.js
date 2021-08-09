import React from 'react'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'

export default function ItemCard({ data }) {

    const clickHandler = () => {
        if (data['sku'])
            document.location.href = `/item/${data['sku']}`
        else
            document.location.href = `/item/${data['urlKey']}`
    }

    return (
        <div className='item-card' onClick={clickHandler}>
            <div className='item-card-content'>
                <div className='item-card-sneaker'>
                    <img src={data.imageThumbnail} loading='lazy' alt={data.model} />
                </div>

                <div className='item-card-text'>
                    <h2> {data.model} </h2>

                    <div className='item-card-see-prices'>
                        <p> See Prices </p>
                        <RightArrow />
                    </div>
                </div>
            </div>
        </div>
    )
}
