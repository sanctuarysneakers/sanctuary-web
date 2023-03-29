import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch } from 'react-redux'
import { hideSearchModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import SearchBox from '../Search/searchBox'

export default function SearchModal () {
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  useOutsideAlerter(wrapperRef)

  return (
        <div className='search-modal'>
            <div className='search-modal-content' ref={wrapperRef}>
                <div className='search-modal-navbar'>
                    <SearchBox/>
                    {!isDesktop && <p onClick={() => dispatch(hideSearchModal())}>
                        Cancel
                    </p>}
                </div>
            </div>
        </div>
  )
}
