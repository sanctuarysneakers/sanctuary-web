import React from 'react'
import firebase from '../../services/firebase.js'
import {showPrivacyModal, showTermsModal } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import facebook from "../../assets/images/logos/facebook.png"
import google from "../../assets/images/logos/google.svg"
import mail from "../../assets/images/logos/mail.svg"

export default function CreateAccountOptions() {

    const provider = new firebase.auth.GoogleAuthProvider()
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const dispatch = useDispatch()

    const googleAuthentication = () => {
        firebase.auth().signInWithRedirect(provider)
    }

    const facebookAuthentication = () => {
        firebase.auth().signInWithRedirect(facebookProvider)
    }

    return (
        <div className='sign-in-options'>

            <div className='sign-in-options-header'>
                <h1> Welcome to </h1>
                <h1> the future </h1>
                <h1> of shopping. </h1>
            </div>
            
            <div className='account-buttons'>

                <button className='facebook-button' onClick={facebookAuthentication}>
                    <img src={facebook} alt='facebook' />
                    <p> Continue with Facebook </p>
                </button>

                <button className='google-button' onClick={googleAuthentication}>
                    <img src={google} alt='google' />
                    <p> Continue with Google </p>
                </button>

                <div className='divider'>
                    <div className='divider-line'></div>
                    <p> OR </p>
                    <div className='divider-line'></div>
                </div>

                <Link className='email-button' to="/create-account-email">
                    <img src={mail} alt='mail' />
                    <p> Create account with Email </p>
                </Link>

                <div className='switch-form'>
                    <p> Already have an account? </p>
                    <Link to="/sign-in"> Sign in. </Link>
                </div>

                <div className='account-terms-policy'>
                    <p> By creating an account, you agree to Sanctuary's </p>
                    <div className='terms-policy-text'>
                        <p className='terms-policy-pop-up' onClick={() => dispatch(showPrivacyModal())}> Privacy Policy </p>
                        <p> and </p>
                        <p className='terms-policy-pop-up' onClick={() => dispatch(showTermsModal())}> Terms of Use. </p>
                    </div>
                </div>

            </div>
        </div>
    )
}