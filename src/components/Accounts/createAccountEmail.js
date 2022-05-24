import React, { useState } from 'react'
import firebase from '../../services/firebase.js'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setRedirectUrl, hideHomeSearch } from '../../redux/actions'
import Footer from '../Other/footer'

export default function CreateAccountEmail() {

    const history = useHistory()
    const dispatch = useDispatch()

    const redirect = useSelector(state => state.redirect)
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const createAccountEmailPassword = () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
        } else if (name === '') {
            setErrorMessage('Please enter your name.')
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(async (r) => {
                    r.user.updateProfile({ displayName: name })
                    if (redirect) {
                        let redirectCopy = redirect
                        dispatch(setRedirectUrl(null))
                        const jwt = await r.user.getIdToken()
                        window.location.href = `${redirectCopy}id_token=${jwt}`
                    }
                    history.push("/")
                }).catch(e => {
                    setErrorMessage(e.message)
                })
        }
    }

    dispatch(hideHomeSearch())

    return (
        <div className='email-form'>
            <div className='email-form-content'>
                <div className='email-form-header'>
                    {/* <img src={sanctuary} alt='Sanctuary' /> */}
                    <h2> Sign Up </h2>
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

                    <button onClick={createAccountEmailPassword}>
                        Sign Up
                    </button>

                    <div className='switch-form'>
                        <p> Already have an account? </p>
                        <Link to="/sign-in-email"> Log in. </Link>
                    </div>

                    <div className='account-terms-policy'>
                        <p> By creating an account, you agree to Sanctuary's </p>
                        <div className='terms-policy-text'>

                            <Link to="/privacy-policy" className='terms-policy-pop-up'>
                                Privacy Policy
                                </Link>

                            <p> and </p>

                            <Link to="/terms-of-use" className='terms-policy-pop-up'>
                                Terms of Use.
                                </Link>

                        </div>
                    </div>

                </div>
            </div>

            <Footer colour={'white'} />

        </div>
    )
}
