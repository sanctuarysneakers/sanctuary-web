import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { hideSizeModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import SizeOption from '../Item/sizeOption'
import { sneakerSizes } from '../../assets/constants'
import { ReactComponent as Close } from '../../assets/images/close.svg'

export default function SizeModal ({ gender }) {
  const dispatch = useDispatch()

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const sizeState = useSelector(state => state.size)

  const sizeOptions = sneakerSizes.map((size) =>
    <SizeOption
      key={size}
      sizeOption={size}
      sizeState={sizeState}
      gender={gender}
      inBrowseFilter={false}
    />
  )

  return (
    <div className='size-modal'>
      <div className='size-modal-content' ref={wrapperRef}>
        <div className='size-modal-padding'>
          <div className='size-modal-close'>
            <button onClick={() => dispatch(hideSizeModal())}>
              <Close />
            </button>
          </div>

          <div className='size-modal-text'>
            <h1> Select your size </h1>
          </div>

          <div className='size-modal-buttons'>
            {sizeOptions}
          </div>
        </div>
      </div>
    </div>
  )
}

SizeModal.propTypes = {
  gender: PropTypes.string
}
