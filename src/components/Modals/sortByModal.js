import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { hideSortByModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { sortByOptions } from '../../assets/constants'
import SortByOption from '../Browse/sortByOption'

export default function SortByModal () {
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  useOutsideAlerter(wrapperRef)

  const sortByComponents = sortByOptions.map((option) =>
    <SortByOption key={option} sortBy={option} />
  )

  return (
    <div className='sort-modal'>
      <div className='sort-modal-content' ref={wrapperRef}>
        <div className='sort-modal-padding'>
          <div className='sort-modal-close'>
            <button onClick={() => dispatch(hideSortByModal())}>
              <Close />
            </button>
          </div>

          <div className='sort-modal-main'>
            <div className='sort-modal-text'>
              <h1> Sort By </h1>
            </div>
            <div className='sort-modal-buttons'>
              {sortByComponents}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
