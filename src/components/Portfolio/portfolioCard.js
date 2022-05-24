import React from 'react'

export default function PortfolioCard({item, remove}) {

	// model data
	const modelName = item.data.modelName
	const sku = item.data.sku
	const urlKey = item.data.urlKey
	const url = item.data.url
	const image = item.data.image

	// record data
	const addDate = item.add_date
	const size = item.size
	const price = Math.round(item.price)
	const currentPrice = Math.round(item.currentPrice)
	const priceChange = currentPrice - price
	const priceChangePrefix = priceChange >= 0 ? "+" : "-"
	const percentChange = (priceChange / price * 100).toFixed(2)
	const percentChangePrefix = percentChange >= 0 ? "+" : ""

    return (
        <div className='portfolio-card'>
            <div className='portfolio-card-content'>
                <div className='portfolio-card-sneaker'>
                    <img src={image} loading='lazy' alt={modelName} />
                </div>

                <h4>{modelName}</h4>

                <p>Added on: {addDate}</p>
                <p>Size: {size}</p>
                <p>Original price: ${price}</p>
                <p>Current price: ${currentPrice}</p>
                <p>Price change: {priceChangePrefix}${Math.abs(priceChange)}</p>
                <p>Percent change: {percentChangePrefix}{percentChange}%</p>

                <button onClick={() => remove(item.record_id)}>
                    Remove
                </button>
            </div>
        </div>
    )
}