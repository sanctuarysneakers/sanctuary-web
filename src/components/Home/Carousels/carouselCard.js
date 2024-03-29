import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemInfo, setItemPricesLoading, setItemListingsLoading } from '../../../redux/actions'
import { currencySymbolMap } from '../../../assets/constants'

export default function CarouselCard ({ data, index, type, length }) {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.currency)

  const generateLink = () => {
    if (type !== 'related') {
      dispatch(updateItemInfo({}))
      dispatch(setItemPricesLoading(true))
      dispatch(setItemListingsLoading(true))
    }

    const itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey
    return data.gender == null ? `/item/${itemKey}` : `/item/${itemKey}/${data.gender}`
  }

  const relatedClick = (e) => {
    if (e.nativeEvent.button === 0) {
      const itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey
      document.location.href = `/item/${itemKey}`
    }
  }

  let position
  if (index === 0) { position = 'carousel-card start' } else if (index === length - 1) { position = 'carousel-card end' } else position = 'carousel-card'

  return (
    <div className={position}>
      {(type === 'trending') &&
      <Link
        to={{
          pathname: generateLink(),
          state: data
        }}
        className="hidden-link"
      >
        <div className='carousel-card-trending'>
          <div className='carousel-card-trending-sneaker'>
            <img src={data.imageThumbnail} alt='Sneaker thumbnail'/>
          </div>

          <div className='carousel-card-trending-text'>
            <div className='carousel-card-trending-model'>
              <p>TRENDING</p>
              <h2>{data.model}</h2>
            </div>

            <div className='carousel-card-trending-price'>
              <p>Estimated</p>
              <h4>{currencySymbolMap[currency]}{data.price.toLocaleString('en')}</h4>
            </div>
          </div>
        </div>
      </Link>
      }

      {(type === 'featuredCollection') &&
      <Link
        to={{
          pathname: generateLink(),
          state: data
        }}
        className="hidden-link"
      >
        <div className='carousel-card-deals'>
          <div className='carousel-card-content'>
            <div className='carousel-card-image'>
              <img src={data.imageThumbnail} alt='Sneaker thumbnail'/>
            </div>

            <div className='carousel-card-text'>
              <h2>{data.model}</h2>
            </div>

            <div className='carousel-card-price'>
              <p>Estimated</p>
              <h4>{currencySymbolMap[currency]}{data.price.toLocaleString('en')}</h4>
            </div>
          </div>
        </div>
      </Link>
      }

      {type === 'related' &&
      <Link
        to={{
          pathname: generateLink(),
          state: data
        }}
        onClick={(event) => relatedClick(event)}
        className="hidden-link"
      >
        <div className='carousel-card-deals'>
          <div className='carousel-card-content'>
            <div className='carousel-card-image'>
              <img src={data.imageThumbnail} alt='Sneaker thumbnail'/>
            </div>

            <div className='carousel-card-text'>
              <h2>{data.model}</h2>
            </div>

            <div className='carousel-card-price'>
              <p>Estimated</p>
              <h4>{currencySymbolMap[currency]}{data.price.toLocaleString('en')}</h4>
            </div>
          </div>
        </div>
      </Link>
      }
    </div>
  )
}

CarouselCard.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  index: PropTypes.number,
  length: PropTypes.number
}
