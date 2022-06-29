import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { updatePortfolioData } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPortfolio } from '../../api/portfolio'

export default function PortfolioItem() {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const portfolio = useSelector(state => state.portfolio)

    const item = location.itemInfo
    const modelName = item.data.modelName
    const recordID = item.record_id
    const image = item.data.image
    const price = Math.round(item.price)
    const currentPrice = Math.round(item.currentPrice)
    const priceChange = currentPrice - price
    const percentChange = (priceChange / price * 100).toFixed(0)
    const colour = (priceChange < 0) ? 'red' : 'green'
    const priceChangePrefix = priceChange >= 0 ? "+" : "-"

    // TODO: add code to link to item page for this sneaker

    const removeItemHandler = (recordID) => {
		removeFromPortfolio(recordID)  // removes from database
		const newPortfolio = portfolio.filter(item => 
			item.record_id !== recordID)
    	dispatch(updatePortfolioData(newPortfolio))

        history.push("/portfolio")
    }

    return (
        <div className='portfolio-item'>
            <div className='portfolio-item-info'>
                <h1>
                    ${currentPrice}.00
                </h1>

                <p> Date Added: {item.add_date} </p>

                <p> Size: {item.size} </p>

                <img src={image} alt='sneaker' />

                <h2> {modelName} </h2>
            </div>

            <div className='portfolio-item-performance'>
                <div className='portfolio-item-performance-content'>
                    <h4>Performance</h4>

                    <div className='portfolio-item-analytic'>
                        <p>Price When Added</p>

                        <h6>${price}</h6>
                    </div>

                    <div className='portfolio-item-analytic'>
                        <p>Price Change</p>

                        <h6 style={{ color: colour }}>
                            {priceChangePrefix}${Math.abs(priceChange)}
                        </h6>
                    </div>

                    <div className='portfolio-item-analytic'>
                        <p>Percent Change</p>

                        <h6 style={{ color: colour }}>
                            {priceChangePrefix}{Math.abs(percentChange)}%
                        </h6>
                    </div>

                    <div className='portfolio-item-actions'>
                        <Link>
                            View Sneaker
                        </Link>

                        <button onClick={() => removeItemHandler(recordID)}>
                            Remove from Portfolio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}