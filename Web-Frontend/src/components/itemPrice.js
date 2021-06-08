import React from 'react'

export default function ItemPrice({data}) {

    return (
        <div className='item-price'>
            <div className='item-price-source'>
                <div className='item-source-logo'>

                </div>
                <div className='item-source-text'>
                    <h2>
                        {data.source}
                    </h2>
                    <p>
                        New
                    </p>
                </div>
            </div>

            <div className='item-price-link'>
                <div className='item-amount'>
                    <h2>
                        ${data.price}
                    </h2>
                </div>
            </div>
        </div>
    )
}