import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function EditProfileName() {

    const [newName, setNewName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector(state => state.user)
    const history = useHistory()

    const updateName = () => {
        if (newName === '') {
            setErrorMessage('Please enter a valid name.')
        }
        else {
            user.updateProfile({
                displayName: newName
            }).then(() => {
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

            </div>
        </div>
    )
}