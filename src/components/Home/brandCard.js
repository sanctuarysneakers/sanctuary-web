import React from 'react'
import PropTypes from 'prop-types'

export default function BrandCard ({ brand, index, length }) {
  let position
  if (index === 0) {
    position = 'brand-card start'
  } else if (index === length - 1) {
    position = 'brand-card end'
  } else {
    position = 'brand-card'
  }

  const handleClick = () => {
    // window.analytics.track(`home_page_brand_clicked_${brand}`, { brand });
    document.location.href = `./browse/${brand}`
  }

  return (
        <div className={position} onClick={handleClick}>
            <div className='brand-card-content'>
                <p>{brand}</p>
            </div>
        </div>
  )
}

BrandCard.propTypes = {
  brand: PropTypes.string,
  index: PropTypes.number,
  length: PropTypes.number
}
