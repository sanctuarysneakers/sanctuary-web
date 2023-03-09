import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { updatePortfolioData } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPortfolio } from '../../api/portfolio'
import { currencySymbolMap } from '../../assets/constants'
import GraphDown from '../../assets/images/downwards-light-desktop.svg'
import GraphUp from '../../assets/images/upwards-light-desktop.svg'
import GraphStraight from '../../assets/images/straight-light-desktop.svg'
import Footer from '../Other/footer'
import { updateItemInfo, setItemPricesLoading, setItemListingsLoading } from '../../redux/actions'

export default function PortfolioItem() {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const portfolio = useSelector(state => state.portfolio)
    const currency = useSelector(state => state.currency)

    const item = location.itemInfo
    const modelName = item.data.modelName
    const recordID = item.record_id
    const image = item.data.image
    const price = Math.round(item.price)
    const currentPrice = Math.round(item.currentPrice)
    const priceChange = currentPrice - price
    const percentChange = (priceChange / price * 100).toFixed(2)
    const colour = priceChange === 0 ? 'grey' : (priceChange > 0 ? 'green' : 'red')
    const graph = priceChange === 0 ? GraphStraight : (priceChange > 0 ? GraphUp : GraphDown)

    // TODO: add code to link to item page for this sneaker
    const generateLink = () => {
        dispatch(updateItemInfo({}))
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))
        
        let itemKey = item.data.sku ? encodeURIComponent(item.data.sku) : item.data.urlKey 
        return item.gender === null ? `/item/${itemKey}` : `/item/${itemKey}/${item.gender}`
    }

    const getNavData = () => {
        let itemInfo = {
            sku: item.sku ? item.sku.replaceAll('-', ' ') : null,
            modelName: item.data.modelName,
            image: item.data.image,
            url: item.data.url,
            urlKey: item.data.urlKey
        }
        return itemInfo
    }

    const removeItemHandler = (recordID) => {
        history.push("/portfolio")
		removeFromPortfolio(recordID)  // removes from database
		const newPortfolio = portfolio?.portfolioData.filter(item => 
			item.record_id !== recordID)
    	dispatch(updatePortfolioData(newPortfolio))
    }

    return (
        <div className='portfolio-item'>
            <div className='portfolio-item-info'>
                <div className='portfolio-item-stats'>
                    <div className='portfolio-item-img-model'>
                        <div className='portfolio-item-img'>
                            <img className='portfolio' src={image} alt='sneaker' />
                        </div>

                        <h1>{modelName}</h1>
                    </div>

                    <h1 className='portfolio-item-price'>
                        {currencySymbolMap[currency]}{currentPrice}.00
                    </h1>

                    <p style={{ color: colour }}>
                        {currencySymbolMap[currency]}{(priceChange)}.00 ({percentChange}%)
                    </p>
                </div>

                <div className='graph'>
                    <img src={graph} alt='graph' />
                </div>

                
                <Link className='portfolio-item-button' to={{ pathname: generateLink(), itemInfo: getNavData() }}>
                    View Listing
                </Link>
                
            </div>

            <div className='portfolio-item-performance'>
                <div className='portfolio-item-performance-content'>
                    <h4>Market Stats</h4>

                    <div className='portfolio-item-performance-stats'>
                        <div className='portfolio-item-performance-info'>
                            <div className='portfolio-item-performance-info-content'>
                                <div className='portfolio-item-performance-info-text'>
                                    <h2>
                                        Sneaker Size
                                    </h2>

                                    <p>
                                        Mens
                                    </p>
                                </div>

                                <p className='portfolio-item-performance-value'>
                                    {item.size}
                                </p>
                            </div>
                        </div>

                        <div className='portfolio-item-performance-info'>
                            <div className='portfolio-item-performance-info-content'>
                                <div className='portfolio-item-performance-info-text'>
                                    <h2>
                                        Market Order
                                    </h2>

                                    <p>
                                        {item.add_date}
                                    </p>
                                </div>

                                <p className='portfolio-item-performance-value'>
                                    {currencySymbolMap[currency]}{item.price}.00
                                </p>
                            </div>
                        </div>

                        <div className='portfolio-item-performance-info'>
                            <div className='portfolio-item-performance-info-content'>
                                <div className='portfolio-item-performance-info-text'>
                                    <h2>
                                        Price Change
                                    </h2>

                                    <p>
                                        All Time
                                    </p>
                                </div>

                                <p className='portfolio-item-performance-value'>
                                    {currencySymbolMap[currency]}{priceChange}.00
                                </p>
                            </div>
                        </div>

                        <div className='portfolio-item-performance-info'>
                            <div className='portfolio-item-performance-info-content'>
                                <div className='portfolio-item-performance-info-text'>
                                    <h2>
                                        Percent Change
                                    </h2>

                                    <p>
                                        All Time
                                    </p>
                                </div>

                                <p className='portfolio-item-performance-value'>
                                    {percentChange}%
                                </p>
                            </div>
                        </div>

                        <div className='portfolio-item-performance-info'>
                            <div className='portfolio-item-performance-info-content last'>
                                <div className='portfolio-item-performance-info-text'>
                                    <h2>
                                        Total Return
                                    </h2>

                                    <p>
                                        All Time
                                    </p>
                                </div>

                                <p className='portfolio-item-performance-value'>
                                    {currencySymbolMap[currency]}{(priceChange)}.00 ({percentChange}%)
                                </p>
                            </div>
                        </div>
                    </div>

                    <button className='portfolio-item-remove' onClick={() => removeItemHandler(recordID)}>
                        Remove from portfolio
                    </button>
                </div>
            </div>

            <Footer colour={'blue'} />
        </div>
    )
}