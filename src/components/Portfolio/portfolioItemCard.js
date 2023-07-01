import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { showPortfolioItemModal, updatePortfolioItemModalData } from '../../redux/actions'
import { brandColors, currencySymbolMap } from '../../assets/constants'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'

export default function PortfolioItemCard ({ item }) {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.currency)
  const percentChange = (((item.currentPrice - item.price) / item.price) * 100).toFixed(2)
  const color = percentChange === 0 ? 'textGrey' : (percentChange > 0 ? 'upwards' : 'downwards')

  const handleClick = () => {
    dispatch(updatePortfolioItemModalData(item))
    dispatch(showPortfolioItemModal())
  }

  return (
    <div className='portfolio-card'>
      <div className='portfolio-card-content' onClick={handleClick}>
        <div className='portfolio-card-info'>
          <div className='portfolio-card-sneaker'>
            <img src={item.data.image} alt='sneaker' />
          </div>

          <div className='portfolio-card-model'>
            <h2>{item.data.model}</h2>
            <p>Size {item.size}</p>
            <p>New</p>
          </div>
        </div>

        <div className='portfolio-card-price'>
          <div className='portfolio-card-price-data'>
            <h2>
              {currencySymbolMap[currency]}{item.currentPrice.toLocaleString('en')}
            </h2>
            <h4 style={{ color: brandColors[color] }}>
              {percentChange}%
            </h4>
          </div>

          <RightArrow />
        </div>
      </div>
    </div>
  )
}

PortfolioItemCard.propTypes = {
  item: PropTypes.object
}
