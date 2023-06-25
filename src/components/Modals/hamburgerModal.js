import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideHamburgerModal } from '../../redux/actions'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'

export default function HamburgerModal () {
  const ref = useRef()
  const dispatch = useDispatch()
  const menuVisible = useSelector(state => state.modals.hamburgerModalVisible)

  useEffect(() => {
    const handleClickOut = (e) => {
      if (menuVisible && ref.current && !ref.current.contains(e.target)) {
        dispatch(hideHamburgerModal())
      }
    }
    document.addEventListener('mousedown', handleClickOut)

    return () => {
      document.removeEventListener('mousedown', handleClickOut)
    }
  })

  return (
    <div className={menuVisible ? 'hamburger-background active' : 'hamburger-background'}>
      <div className={menuVisible ? 'hamburger-modal active' : 'hamburger-modal'} ref={ref}>

        <div className='hamburger-modal-content'>
          <div className='hamburger-modal-header'>
            <div className='hamburger-modal-tab' />
            <h2> Menu </h2>
          </div>

          <div className='hamburger-modal-links'>
            <div className='hamburger-modal-option'
              onClick={() => { document.location.href = '/browse' }}
            >
              <div className='hamburger-modal-option-content'>
                <p> Browse </p>
                <RightArrow />
              </div>
            </div>

            <div className='hamburger-modal-option'
              onClick={() => { document.location.href = '/portfolio' }}
            >
              <div className='hamburger-modal-option-content'>
                <p> Portfolio </p>
                <RightArrow />
              </div>
            </div>

            <div className='hamburger-modal-option'
              onClick={() => { document.location.href = '/newsroom' }}
            >
              <div className='hamburger-modal-option-content'>
                <p> Newsroom </p>
                <RightArrow />
              </div>
            </div>

            <div className='hamburger-modal-option'
              onClick={() => { document.location.href = '/how-it-works' }}
            >
              <div className='hamburger-modal-option-content last'>
                <p> How it Works </p>
                <RightArrow />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
