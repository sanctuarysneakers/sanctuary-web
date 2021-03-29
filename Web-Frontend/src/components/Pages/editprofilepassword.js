import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'

export default function EditProfilePassword() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector(state => state.user)

    // Hide the search bar
    dispatch(hideHomeSearch())

    const updateName = () => {
        if (newPassword !== newConfirmPassword) {
            setErrorMessage('Passwords do not match.')
        }
        else {
            user.updatePassword(newPassword).then(() => {
                history.push("/profile")
                window.scrollTo(0, 0)
            }).catch(e => {
                setErrorMessage(e.message)
            })
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
                        <div className='save-edit' onClick={updateName}>
                            <p> Save </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}