import React from 'react'

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

                    <p> Learn More </p>
                </div>
            </div>
        </div>





        // <div className='item-card' onClick={clickHandler}>
        //     <div className='item-card-wrapper'>

        //         <div className='item-card-shoe'>
        //             <img src={data.imageThumbnail} loading='lazy' alt={data.model} />
        //         </div>

        //         <div className='item-card-text'>
        //             <h2>
        //                 {data.model}
        //             </h2>
        //             <p>
        //                 Learn More
        //             </p>
        //         </div>

        //     </div>
        // </div>
    )
}
