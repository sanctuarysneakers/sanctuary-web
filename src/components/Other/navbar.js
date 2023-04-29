/* eslint-disable no-return-assign */
import { useAuth0 } from '@auth0/auth0-react'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { showSearchModal, showHamburgerModal } from '../../redux/actions'
import { ReactComponent as SanctuaryLogo } from '../../assets/images/SanctuaryLogo.svg'
import { ReactComponent as Search } from '../../assets/images/Search.svg'
import { ReactComponent as Hamburger } from '../../assets/images/Hamburger.svg'

export default function Navbar () {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
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
            {!isAuthenticated &&
              <div className="login" onClick={() => loginWithRedirect()}>Log in</div>
            }
            {!isAuthenticated &&
            <div className="create-account" onClick={() => loginWithRedirect()}>Sign up</div>
            }
            {isAuthenticated &&
              <div className="logout"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log out
              </div>
            }
            {isAuthenticated &&
            <Link className='navbar-profile'
              to='/profile'
            >
              <div className='navbar-profile-content'>
                <img className='navbar-profile-picture' src={user.picture} alt={user.name} />
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
