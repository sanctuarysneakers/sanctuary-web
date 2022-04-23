import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../services/firebase.js'
import Footer from '../Other/footer'
import sanctuary from "../../assets/images/logos/sanctuary-bird-black.png"

export default function SignInEmail() {
    
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const resetPassword = () => {
        if (!email) {
            setErrorMessage('Please enter a valid email address')
        } else {
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    history.push("/sign-in-email")
                })
                .catch((error) => {
                    setErrorMessage(error)
                })
        }
    }

    return (
        <div className='email-form'>
            <div className='email-form-content'>
                <div className='email-form-header'>
                    <img src={sanctuary} alt='Sanctuary' />
                    <h2> Forgot Password </h2>
                    <p> Enter your email address </p>
                    <p> to reset your password. </p>
                </div>

                {errorMessage && <p className='email-form-error'>
                    {errorMessage}
                </p>}

                <div className='email-form-input'>
                    <div className='email-input'>
                        <input
                            className="inputBox"
                            placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>
                </div>

                <div className='email-form-bottom'>
                    <button onClick={resetPassword}>
                        Reset Password
                    </button>
                </div>
            </div>

            <Footer colour={'white'} />
        </div>
    )
}