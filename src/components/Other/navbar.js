/* eslint-disable no-return-assign */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { showSearchModal, showHamburgerModal } from '../../redux/actions'
import { ReactComponent as SanctuaryLogo } from '../../assets/images/SanctuaryLogo.svg'
import { ReactComponent as Search } from '../../assets/images/Search.svg'
import { ReactComponent as Hamburger } from '../../assets/images/Hamburger.svg'
import ProfileIcon from '../../assets/images/icons/profileIcon'

export default function Navbar () {
  const user = useSelector(state => state.user)
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
            to='/'
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
            {!user &&
              <div className="login" onClick={() => { document.location.href = '/sign-in-email' }}>Log in</div>
            }
            {!user &&
            <div className="create-account"
              onClick={() => document.location.href = '/create-account-email'}>
              Sign up
            </div>
            }
            {user &&
            <Link className='navbar-profile'
              to='/profile'
            >
              <div className='navbar-profile-content'>
                <ProfileIcon className='navbar-profile-picture'/>
              </div>
            </Link>
            }
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
