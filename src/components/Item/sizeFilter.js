import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { showSizeModal } from '../../redux/actions'
import { ReactComponent as DownArrow } from '../../assets/images/arrowDown.svg'

export default function SizeFilter ({ gender }) {
  const dispatch = useDispatch()
  const size = useSelector(state => state.size)
  const genderSymbol = (gender === 'women') ? 'W' : 'M'

  return (
    <div className='size-filter' onClick={() => dispatch(showSizeModal())}>
      <h4> Size {genderSymbol} {size} </h4>
      <DownArrow />
    </div>
  )
}

SizeFilter.propTypes = {
  gender: PropTypes.string
}
