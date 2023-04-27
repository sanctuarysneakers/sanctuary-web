import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBrowseBrand } from '../../redux/actions'
import PropTypes from 'prop-types'

export default function BrandOption ({ brand }) {
  const dispatch = useDispatch()

  const brands = useSelector(state => state.browse.filters.brands)

  const clickHandler = () => {
    dispatch(toggleBrowseBrand(brand))
  }

  const brandOptionClassName = brands.includes(brand)
    ? 'brands-option current'
    : 'brands-option'

  return (
    <div className={brandOptionClassName}>
      <div className='brands-option-content' onClick={clickHandler}>
        <p className='brands-option-text'>
          {brand}
        </p>
      </div>
    </div>
  )
}

BrandOption.propTypes = {
  brand: PropTypes.string
}
