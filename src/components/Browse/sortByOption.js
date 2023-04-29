import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBrowseSort } from '../../redux/actions'
import PropTypes from 'prop-types'
import { sortByOptionsFormattedMap } from '../../assets/constants'

export default function SortByOption ({ sortBy }) {
  const dispatch = useDispatch()

  const sortByState = useSelector(state => state.browse.filters.sortBy)

  const clickHandler = () => {
    dispatch(updateBrowseSort(sortBy))
  }

  return (
    <div className={sortByState === sortBy ? 'sort-option current' : 'sort-option'}>
      <div className='sort-option-content' onClick={clickHandler}>
        <p className='sort-option-text'>
          {sortByOptionsFormattedMap[sortBy]}
        </p>
      </div>
    </div>
  )
}

SortByOption.propTypes = {
  sortBy: PropTypes.string
}
