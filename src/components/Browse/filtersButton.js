import React from 'react'
import { useDispatch } from 'react-redux'
import { showFiltersModal } from '../../redux/actions'
import { ReactComponent as DownArrow } from '../../assets/images/arrowDown.svg'

export default function FiltersButton () {
  const dispatch = useDispatch()

  return (
    <div className='filters-button' onClick={() => dispatch(showFiltersModal())}>
      <h4> Filters </h4>
      <DownArrow />
    </div>
  )
}
