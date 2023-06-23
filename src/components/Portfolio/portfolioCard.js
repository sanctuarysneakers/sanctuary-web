import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'

export default function PortfolioCard ({ item }) {
  const modelName = item.data.modelName
  const image = item.data.image
  const price = Math.round(item.price)
  const currentPrice = Math.round(item.currentPrice)
  const priceChange = currentPrice - price
  const percentChange = (priceChange / price * 100).toFixed(2)
  const color = priceChange === 0 ? 'grey' : (priceChange > 0 ? 'green' : 'red')

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

            <p>
              Size {item.size}
            </p>

            <p>
              New
            </p>
          </div>
        </div>

        <div className='portfolio-card-price'>
          <div className='portfolio-card-price-data'>
            <h2>
              ${Math.round(item.currentPrice)}
            </h2>

            <h4 style={{ color }}>
              {percentChange}%
            </h4>
          </div>

          <RightArrow />
        </div>
      </Link>
    </div>
  )
}

PortfolioCard.propTypes = {
  item: PropTypes.object
}
