import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// component used to wrap a list of elements to allow the user to choose to see more/less items
export default function DynamicList ({ name, items, initialLength }) {
  const useShowMore = (items && items.length > initialLength)

  const [showMore, setShowMore] = useState(true)
  const [displayItems, setDisplayitems] = useState(items)

  useEffect(() => {
    if (showMore) {
      setDisplayitems(items.slice(0, initialLength))
    } else {
      setDisplayitems(items)
    }
    // eslint-disable-next-line
    }, [showMore])

  return (
    <div className='dynamic-list'>
      <div className={name}>
        {displayItems}
      </div>

      {useShowMore &&
      <button className='dynamic-list-button' onClick={() => setShowMore(!showMore)}>
        {showMore ? 'See All' : 'See Less'}
      </button>
      }
    </div>
  )
}

DynamicList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  initialLength: PropTypes.number
}
