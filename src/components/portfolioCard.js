import React from 'react'

export default function PortfolioCard({ data }) {
    return (
        <div className='portfolio-card'>
            <h4>Item SKU: {data.sku}</h4>
            <p>{data.add_date}</p>
            <p>Size: {data.size}</p>
            <p>Price: ${data.price}</p>
            <br/>
        </div>
    )
}