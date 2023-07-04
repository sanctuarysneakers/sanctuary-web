import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../../redux/actions'
import { FaChevronRight } from 'react-icons/fa'
import { getAuth, signOut } from 'firebase/auth'
import ProfileIcon from '../../assets/images/icons/profileIcon'
import Footer from '../Other/footer'

export default function Profile () {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const displayName = user?.displayName ? user?.displayName : user?.email

  useEffect(() => {
    if (!user) {
      document.location.href = '/'
    }
  }, [user])

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      dispatch(setUser(null))
      document.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='profile-page'>

      {!user && <div className='not-signed-in'>
      </div>}

      {user && <div className='profile-page-container'>

        <div className='profile-page-title'>
          <h1> Profile </h1>
          <p> BETA </p>
        </div>

        <div className='profile-page-header'>

          <div className='profile-picture'>
            <div className='profile-picture-container'>
              <ProfileIcon />
            </div>
          </div>

          <div className='profile-text'>
            <h1> {displayName} </h1>
            <p> {user.email} </p>
          </div>

        </div>

        <div className='profile-page-options'>
          <div className='profile-page-options-container'>
            <div className='edit-profile'>
              <Link to='/profile-edit-name'>
                <div className='edit-profile-container'>
                  <p> Update Name </p>
                  <FaChevronRight />
                </div>
              </Link>
            </div>
            <div className='edit-profile'>
              <Link to='/profile-edit-email'>
                <div className='edit-profile-container'>
                  <p> Edit Email </p>
                  <FaChevronRight />
                </div>
              </Link>
            </div>
            <div className='edit-profile'>
              <Link to='/profile-edit-password'>
                <div className='edit-profile-container'>
                  <p> Change Password </p>
                  <FaChevronRight />
                </div>
              </Link>
            </div>

            <div className='profile-sign-out' onClick={handleSignOut}>
              <p> Sign Out </p>
            </div>
          </div>
        </div>

      </div>}

      <Footer color={'white'} />
    </div>
  )
}
