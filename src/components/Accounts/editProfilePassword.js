import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAuth, updatePassword } from 'firebase/auth'
import { setUser } from '../../redux/actions'
import Footer from '../Other/footer'

export default function EditProfilePassword () {
  const dispatch = useDispatch()
  const auth = getAuth()

  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user) {
      document.location.href = '/'
    }
  }, [user])

  const handlePasswordUpdate = async () => {
    if (newPassword !== newConfirmPassword) {
      setErrorMessage('Passwords do not match.')
    } else {
      try {
        await updatePassword(auth.currentUser, newPassword)
        dispatch(setUser(auth.currentUser))
        document.location.href = '/profile'
      } catch (err) {
        setErrorMessage(err.message)
      }
    }
  }

  return (
    <div className='edit-profile-page'>
      <div className='edit-profile-page-container'>

        <div className='edit-profile-page-title'>
          <h1> Password </h1>
          <p> Update your Sanctuary account password. This will
            be used for signing in from now on.
          </p>
        </div>

        <div className='edit-profile-page-content'>

          {errorMessage &&
          <p className='edit-profile-page-error'>
            {errorMessage}
          </p>
          }

          <div className='edit-profile-page-input'>

            <div className='edit-input'>
              <input
                className="inputBox"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={event => setNewPassword(event.target.value)}
              />
            </div>

            <div className='edit-input'>
              <input
                className="inputBox"
                type="password"
                placeholder="Confirm New Password"
                value={newConfirmPassword}
                onChange={event => setNewConfirmPassword(event.target.value)}
              />
            </div>

          </div>

          <div className='edit-profile-page-buttons'>
            <div className='save-edit' onClick={handlePasswordUpdate}>
              <p> Save </p>
            </div>
          </div>

        </div>

      </div>

      <Footer colour={'white'} />
    </div>
  )
}
