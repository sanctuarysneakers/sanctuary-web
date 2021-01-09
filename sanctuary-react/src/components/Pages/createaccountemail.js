import React, { useState } from 'react'
import firebase from '../../services/firebase.js'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {showPrivacyModal, showTermsModal } from '../../redux/actions'
import sanctuary from "../../assets/images/logos/sanctuary-bird-black.png"

export default function CreateAccountEmail() {
    // TODO: Change these initial values to empty strings LOL
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const createAccountEmailPassword = () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
        }
        else if (name === '') {
            setErrorMessage('Please enter your name.')
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(r => {
                    r.user.updateProfile({displayName: name})
                    history.push("/")
                    window.scrollTo(0, 0)
                })
                .catch(e => {
                    setErrorMessage(e.message)
                })
        }
    }

    return (
        <div className='email-form'>

            <div className='email-form-header'>
                <img src={sanctuary} alt='Sanctuary' />
                <h2> Create account </h2>
                <p> Create your Sanctuary profile for a brand new </p>
                <p> experience, personalized just for you. </p>
            </div>

            {errorMessage && <p className='email-form-error'>
                {errorMessage}
            </p>}

            <div className='email-form-input-create-account'>
                <div className='name-input'>
                    <input
                    className="inputBox"
                    placeholder="Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className='email-input'>
                    <input
                    className="inputBox"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    />
                </div>

                <div className='password-input'>
                    <input
                    className="inputBox"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    />
                </div>

                <div className='confirm-password-input'>
                    <input
                    className="inputBox"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    />
                </div>
            </div>

            <div className='email-form-bottom'>

                <div className='account-terms-policy'>
                    <p> By creating an account, you agree to Sanctuary's </p>
                    <div className='terms-policy-text'>
                        <p className='terms-policy-pop-up' onClick={() => dispatch(showPrivacyModal())}> Privacy Policy </p>
                        <p> and </p>
                        <p className='terms-policy-pop-up' onClick={() => dispatch(showTermsModal())}> Terms of Use. </p>
                    </div>
                </div>

                <button onClick={createAccountEmailPassword}>
                    Create account
                </button>

                <div className='switch-form'>
                    <p> Already have an account? </p>
                    <Link to="/sign-in-email"> Sign in. </Link>
                </div>

            </div>

        </div>
    )
}
