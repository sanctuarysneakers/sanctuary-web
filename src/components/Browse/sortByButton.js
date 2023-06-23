import React from 'react'
import { useDispatch } from 'react-redux'
import { showSortByModal } from '../../redux/actions'
import { ReactComponent as DownArrow } from '../../assets/images/arrowDown.svg'

export default function SortByButton () {
  const dispatch = useDispatch()

  return (
    <div className='sort-button' onClick={() => dispatch(showSortByModal())}>
      <h4> Sort By </h4>
      <DownArrow />
    </div>
  )
}
