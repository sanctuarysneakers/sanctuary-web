import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'

export default function PortfolioCard({ item, remove }) {

    const modelName = item.data.modelName
    const image = item.data.image
    const price = Math.round(item.price)
    const currentPrice = Math.round(item.currentPrice)
    const priceChange = currentPrice - price
    const percentChange = (priceChange / price * 100).toFixed(0)
    const colour = (priceChange < 0) ? 'red' : 'green'

    return (
        <div className='portfolio-card'>
            <Link className='portfolio-card-content' to={{
                pathname: 'portfolio-item',
                itemInfo: item
            }}>
                <div className='portfolio-card-info'>
                    <div className='portfolio-card-sneaker'>
                        <img src={image} alt='sneaker' />
                    </div>

                    <div className='portfolio-card-model'>
                        <h2>
                            {modelName}
                        </h2>
                    </div>
                </div>

                <div className='portfolio-card-price'>
                    <div className='portfolio-card-price-data'>
                        <h2>
                            ${Math.round(item.currentPrice)}
                        </h2>

                        <h4 style={{ color: colour }}>
                            ${Math.abs(priceChange)} ({Math.abs(percentChange)}%)
                        </h4>
                    </div>

                    <RightArrow />
                </div>
            </Link>
        </div>
    )
}








// import React from 'react'

// export default function PortfolioCard({item, remove}) {

// 	// model data
// 	const modelName = item.data.modelName
// 	const sku = item.data.sku
// 	const urlKey = item.data.urlKey
// 	const url = item.data.url
// 	const image = item.data.image

// 	// record data
// 	const recordID = item.record_id
// 	const addDate = item.add_date
// 	const size = item.size
// 	const price = Math.round(item.price)
// 	const currentPrice = Math.round(item.currentPrice)
// 	const priceChange = currentPrice - price
// 	const priceChangePrefix = priceChange >= 0 ? "+" : "-"
// 	const percentChange = (priceChange / price * 100).toFixed(2)
// 	const percentChangePrefix = percentChange >= 0 ? "+" : ""

//     return (
//         <div className='portfolio-card'>
//             <div className='portfolio-card-content'>
//                 <div className='portfolio-card-sneaker'>
//                     <img src={image} loading='lazy' alt={modelName} />
//                 </div>

//                 <h4>{modelName}</h4>

//                 <p>Added on: {addDate}</p>
//                 <p>Size: {size}</p>
//                 <p>Original price: ${price}</p>
//                 <p>Current price: ${currentPrice}</p>
//                 <p>Price change: {priceChangePrefix}${Math.abs(priceChange)}</p>
//                 <p>Percent change: {percentChangePrefix}{percentChange}%</p>

//                 <button onClick={() => remove(recordID)}>
//                     Remove
//                 </button>
//             </div>
//         </div>
//     )
// }