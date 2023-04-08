/* eslint-disable no-return-assign */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { showSearchModal, showHamburgerModal } from '../../redux/actions'
import { ReactComponent as SanctuaryLogo } from '../../assets/images/SanctuaryLogo.svg'
import { ReactComponent as Search } from '../../assets/images/Search.svg'
import { ReactComponent as Hamburger } from '../../assets/images/Hamburger.svg'

export default function Navbar () {
  const [navbar, setNavbar] = useState(false)

  const dispatch = useDispatch()
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  const setDropShadow = () => {
    if (window.scrollY >= 5) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', setDropShadow)

  return (
    <nav className={navbar ? 'navbar active' : 'navbar'}>
      <div className='navbar-content'>
        {isDesktop && <div className='desktop-content'>

          <Link
            className='sanctuary-logo'
            onClick={() => document.location.href = '/'}
          >
            <SanctuaryLogo />
          </Link>

          <div className='navbar-links'>
            <Search onClick={() => dispatch(showSearchModal())} />

            <Link
              onClick={() => document.location.href = '/browse'}
            >
              Browse
            </Link>

            <Link
              onClick={() => document.location.href = '/newsroom'}
            >
              Newsroom
            </Link>
          </div>
        </div>}

        {!isDesktop && <div className='mobile-content'>
          <div className='hamburger-icon' onClick={() => dispatch(showHamburgerModal())}>
            <Hamburger />
          </div>

          <Link className='sanctuary-logo'
            onClick={() => document.location.href = '/'}
          >
            <SanctuaryLogo />
          </Link>

          <Search onClick={() => dispatch(showSearchModal())} />
        </div>}
      </div>
    </nav>
  )
}
