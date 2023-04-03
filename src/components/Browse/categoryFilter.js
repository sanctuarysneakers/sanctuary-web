import React from 'react'
import { useDispatch } from 'react-redux'
import { showCategoryFilterModal } from '../../redux/actions'
import { ReactComponent as DownArrow } from '../../assets/images/arrowDown.svg'

export default function CategoryFilter () {
  const dispatch = useDispatch()

  return (
    <div className='category-filter' onClick={() => dispatch(showCategoryFilterModal())}>
      <h4> Categories </h4>
      <DownArrow />
    </div>
  )
}
