import React from 'react'
import { useDispatch } from 'react-redux'
import { hideBrandsFilterModal } from '../../redux/actions'
import PropTypes from 'prop-types'

export default function BrandOption ({ brand }) {
  const dispatch = useDispatch()

  const clickHandler = () => {
    document.location.href = '/browse/' + brand
    dispatch(hideBrandsFilterModal())
  }

  return (
    <div className='brands-option'>

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
