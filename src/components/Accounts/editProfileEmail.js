import React, { useEffect, useState } from 'react'
import { getAuth, updateEmail } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions'
import Footer from '../Other/footer'

export default function EditProfileEmail () {
  const auth = getAuth()

  const dispatch = useDispatch()
  const [newEmail, setNewEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user) {
      document.location.href = '/'
    }
  }, [user])

  const handleEmailUpdate = async () => {
    try {
      await updateEmail(auth.currentUser, newEmail)
      dispatch(setUser(auth.currentUser))
      document.location.href = '/profile'
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <div className='edit-profile-page'>
      <div className='edit-profile-page-container'>

        <div className='edit-profile-page-title'>
          <h1> Email </h1>
          <p> Update your Sanctuary account email address. You will
            use this new email address to log in.
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
                placeholder="New Email Address"
                value={newEmail}
                onChange={event => setNewEmail(event.target.value)}
              />
            </div>
          </div>

          <div className='edit-profile-page-buttons'>
            <div className='save-edit' onClick={handleEmailUpdate}>
              <p> Save </p>
            </div>
          </div>

        </div>

      </div>

      <Footer colour={'white'} />
    </div>
  )
}
