import React from 'react'
import { useDispatch } from 'react-redux'
import { showFiltersModal } from '../../redux/actions'
import { ReactComponent as DownArrow } from '../../assets/images/arrowDown.svg'

export default function SortByButton () {
  const dispatch = useDispatch()

  return (
    <div className='sort-button' onClick={() => dispatch(showFiltersModal())}>
      <h4> Sort By </h4>
      <DownArrow />
    </div>
  )
}
