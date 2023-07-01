import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPortfolio } from '../../api/portfolioFunctions'
import { brandColors, currencySymbolMap } from '../../assets/constants'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import GraphDown from '../../assets/images/downwards-light-desktop.svg'
import GraphUp from '../../assets/images/upwards-light-desktop.svg'
import GraphStraight from '../../assets/images/straight-light-desktop.svg'
import {
  hidePortfolioItemModal,
  updateItemInfo,
  setItemPricesLoading,
  setItemListingsLoading
} from '../../redux/actions'

export default function PortfolioItemModal () {
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)

  const item = useSelector(state => state.portfolio.modalData)
  const currency = useSelector(state => state.currency)

  const price = item.price
  const currentPrice = item.currentPrice
  const priceChange = currentPrice - price
  const percentChange = (priceChange / price * 100).toFixed(2)
  const color = percentChange === 0 ? 'textGrey' : (percentChange > 0 ? 'upwards' : 'downwards')
  const graph = priceChange === 0 ? GraphStraight : (priceChange > 0 ? GraphUp : GraphDown)

  const generateLink = () => {
    dispatch(updateItemInfo({}))
    dispatch(setItemPricesLoading(true))
    dispatch(setItemListingsLoading(true))

    const itemKey = item.data.sku ? encodeURIComponent(item.data.sku) : item.data.urlKey
    return item.gender === null ? `/item/${itemKey}` : `/item/${itemKey}/${item.gender}`
  }

  const removeHandler = async () => {
    await removeFromPortfolio(item.record_id)
    dispatch(hidePortfolioItemModal())
  }

  console.log(item)

  return (
    <div className='portfolio-modal'>
      <div className='portfolio-modal-close'>
        <button onClick={() => dispatch(hidePortfolioItemModal())}>
          <Close />
        </button>
      </div>

      <div className='portfolio-modal-content' ref={wrapperRef}>
        <div className='portfolio-item'>
          <div className='portfolio-item-info'>
            <div className='portfolio-item-stats'>
              <div className='portfolio-item-img-model'>
                <div className='portfolio-item-img'>
                  <img className='portfolio' src={item.data.image} alt='sneaker' />
                </div>

                <h1>{item.data.model}</h1>
              </div>

              <h1 className='portfolio-item-price'>
                {currencySymbolMap[currency]}{currentPrice}.00
              </h1>

              <p style={{ color: brandColors[color] }}>
                {currencySymbolMap[currency]}{(priceChange)}.00 ({percentChange}%)
              </p>
            </div>

            <div className='graph'>
              <img src={graph} alt='graph' />
            </div>

            <Link
              className='portfolio-item-button'
              onClick={() => dispatch(hidePortfolioItemModal())}
              to={{ pathname: generateLink(), state: item.data }}
            >
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
                      <h2>Sneaker Size</h2>
                      <p>Mens</p>
                    </div>

                    <p className='portfolio-item-performance-value'>
                      {item.size}
                    </p>
                  </div>
                </div>

                <div className='portfolio-item-performance-info'>
                  <div className='portfolio-item-performance-info-content'>
                    <div className='portfolio-item-performance-info-text'>
                      <h2>Market Order</h2>
                      <p>{item.add_date}</p>
                    </div>

                    <p className='portfolio-item-performance-value'>
                      {currencySymbolMap[currency]}{item.price}.00
                    </p>
                  </div>
                </div>

                <div className='portfolio-item-performance-info'>
                  <div className='portfolio-item-performance-info-content'>
                    <div className='portfolio-item-performance-info-text'>
                      <h2>Price Change</h2>
                      <p>All Time</p>
                    </div>

                    <p className='portfolio-item-performance-value'>
                      {currencySymbolMap[currency]}{priceChange}.00
                    </p>
                  </div>
                </div>

                <div className='portfolio-item-performance-info'>
                  <div className='portfolio-item-performance-info-content'>
                    <div className='portfolio-item-performance-info-text'>
                      <h2>Percent Change</h2>
                      <p>All Time</p>
                    </div>

                    <p className='portfolio-item-performance-value'>
                      {percentChange}%
                    </p>
                  </div>
                </div>

                <div className='portfolio-item-performance-info'>
                  <div className='portfolio-item-performance-info-content last'>
                    <div className='portfolio-item-performance-info-text'>
                      <h2>Total Return</h2>
                      <p>All Time</p>
                    </div>

                    <p className='portfolio-item-performance-value'>
                      {currencySymbolMap[currency]}{(priceChange)}.00 ({percentChange}%)
                    </p>
                  </div>
                </div>
              </div>

              <button className='portfolio-item-remove' onClick={removeHandler}>
                Remove from portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
