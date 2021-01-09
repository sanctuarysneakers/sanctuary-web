import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import firebase from '../../services/firebase.js'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import {showPrivacyModal, showTermsModal } from '../../redux/actions'
import sanctuary from "../../assets/images/logos/sanctuary-bird-black.png"

export default function SignInEmail() {
    // TODO: Change these initial values to empty strings LOL
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const signInEmailPassword = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push("/")
                window.scrollTo(0, 0)
            })
            .catch(e => {
                setErrorMessage(e.message)
            }
        );
    }

    return (
        <div className='email-form'>

            <div className='email-form-header'>
                <img src={sanctuary} alt='Sanctuary' />
                <h2> Sign in </h2>
                <p> Welcome back, </p>
                <p> your perfect pair of shoes awaits you. </p>
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

                <div className='password-input'>
                    <input
                    className="inputBox"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    />
                </div>

            </div>

            <div className='email-form-bottom'>

                <div className='account-terms-policy'>
                    <p> By signing in, you agree to Sanctuary's </p>
                    <div className='terms-policy-text'>
                        <p className='terms-policy-pop-up' onClick={() => dispatch(showPrivacyModal())}> Privacy Policy </p>
                        <p> and </p>
                        <p className='terms-policy-pop-up' onClick={() => dispatch(showTermsModal())}> Terms of Use. </p>
                    </div>
                </div>

                <button onClick={signInEmailPassword}>
                    Sign in
                </button>

                <div className='switch-form'>
                    <p> Don't have an account? </p>
                    <Link to="/create-account-email"> Create account. </Link>
                </div>

            </div>

        </div>
    )
}
