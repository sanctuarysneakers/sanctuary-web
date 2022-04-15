import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'
import Footer from '../Other/footer'

export default function EditProfileEmail() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [newEmail, setNewEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector(state => state.user)

    // Hide the search bar
    dispatch(hideHomeSearch())

    const updateEmail = () => {

        user.updateEmail(newEmail).then(() => {
            history.push("/profile")
        }).catch(e => {
            setErrorMessage(e.message)
        })

    }

    return (
        <div className='edit-profile-page'>
            <div className='edit-profile-page-container'>

                <div className='edit-profile-page-title'>
                    <h1> Email </h1>
                    <p> Update your Sanctuary account email address. You will
                    use this new email address to sign in.
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
                        <div className='save-edit' onClick={updateEmail}>
                            <p> Save </p>
                        </div>
                    </div>

                </div>

            </div>

            <Footer colour={'white'} />
        </div>
    )
}