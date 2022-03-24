import React from 'react'

export default function PortfolioCard({ data }) {
    return (
        <div className='portfolio-card'>
            <div className='portfolio-card-content'>
                <div className='portfolio-card-sneaker'>
                    <img src={data.itemInfo[0].image} loading='lazy' alt={data.itemInfo[0].modelName} />
                </div>
            <h4>{data.itemInfo[0].modelName}</h4>
            <p>Added on: {data.add_date}</p>
            <p>Size: {data.size}</p>
            <p>Original price: ${data.price}</p>
            <p>Current price: ${data.currPrices[0][0].price}</p>
            <p> Price change: ${data.currPrices[0][0].price - data.price} </p>
            <p> Percent change: {Math.round(((data.currPrices[0][0].price - data.price)/data.price) * 100)}%</p>


            </div>
        </div>
    )
}