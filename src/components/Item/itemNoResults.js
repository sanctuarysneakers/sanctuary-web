import React from 'react'
import PropTypes from 'prop-types'

export default function ItemNoResults ({ version }) {
  return (
    <div className='item-no-results'>
      <div className='item-no-results-content'>
        {(version === 'prices') ? <p> No Results </p> : <p> No Results </p>}
      </div>
    </div>
  )
}

ItemNoResults.propTypes = {
  version: PropTypes.string
}
