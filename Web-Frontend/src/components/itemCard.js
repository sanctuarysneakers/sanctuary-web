import React from 'react'


export default function ItemCard({data}) {

    const clickHandler = () => {
        // redirect to item page
        document.location.href = `/item/${data.urlKey}`
    }

    return (
        <div className='item-card' onClick={clickHandler}>
            <div className='item-card-wrapper'>

                <div className='item-card-shoe'>
                    <img src={data.imageThumbnail} loading='lazy' alt={data.model} />
                </div>

                <div className='item-card-text'>
                    <h2>
                        {data.model}
                    </h2>
                    <p>
                        Learn More
                    </p>
                </div>

            </div>
        </div>
    )

}
