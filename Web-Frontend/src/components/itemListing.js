import React from 'react'

export default function ItemListing({data}) {

    return (
        <div className='item-listing'>
            <div className='item-listing-source'>
                <div className='item-listing-image'>
                    <img src={data.image} alt='sneaker image' />
                </div>
                
                <div className='item-listing-text'>
                    <h4 className='used-text'>
                        {data.source}
                    </h4>
                    <p>
                        Used
                    </p>
                </div>
            </div>

            <div className='item-listing-link'>
                <div className='item-listing-amount'>
                    <h4>
                        ${data.price}
                    </h4>
                </div>
            </div>
        </div>
    )
}