import React from 'react'
import { useDispatch } from 'react-redux'
import { showBrandsFilterModal } from '../../redux/actions'
import { ReactComponent as DownArrow } from '../../assets/images/arrowDown.svg'

export default function BrandsFilter () {
  const dispatch = useDispatch()

  return (
    <div className='brands-filter' onClick={() => dispatch(showBrandsFilterModal())}>
      <h4> Brands </h4>
      <DownArrow />
    </div>
  )
}
