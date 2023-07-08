import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions'
import Footer from '../Other/footer'

export default function EditProfileName () {
  const auth = getAuth()

  const dispatch = useDispatch()
  const [newName, setNewName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user) {
      document.location.href = '/'
    }
  }, [user])

  const updateName = async () => {
    if (newName === '') {
      setErrorMessage('Please enter a valid name.')
    } else {
      await updateProfile(auth.currentUser, { displayName: newName })
      dispatch(setUser(auth.currentUser))
      document.location.href = '/profile'
    }
  }

  return (
    <div className='edit-profile-page'>

      {user && <div className='edit-profile-page-container'>

        <div className='edit-profile-page-title'>
          <h1> Name </h1>
          <p> Update your Sanctuary account display name. </p>
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
                placeholder="New Name"
                value={newName}
                onChange={event => setNewName(event.target.value)}
              />
            </div>

          </div>

          <div className='edit-profile-page-buttons'>
            <div className='save-edit' onClick={updateName}>
              <p> Save </p>
            </div>
          </div>

        </div>

      </div>}

      <Footer colour={'white'} />
    </div>
  )
}
