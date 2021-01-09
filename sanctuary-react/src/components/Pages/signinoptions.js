import React from 'react'
import firebase from '../../services/firebase.js'
import {showPrivacyModal, showTermsModal } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import facebook from "../../assets/images/logos/facebook.png"
import google from "../../assets/images/logos/google.svg"
import mail from "../../assets/images/logos/mail.svg"

export default function SignInOptions() {

    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })
    const dispatch = useDispatch()

    const googleAuthentication = () => {
        firebase.auth().signInWithRedirect(googleProvider)
    }

    const facebookAuthentication = () => {
        firebase.auth().signInWithRedirect(facebookProvider)
    }

    return (
        <div className='sign-in-options'>

            {!isDesktop && <div className='sign-in-options-header'>
                <h1> Everything </h1>
                <h1> sneakers. </h1>
                <h1> All in one place. </h1>
            </div>}

            {isDesktop && <div className='sign-in-options-header'>
                <h1> Everything sneakers. </h1>
                <h1> All in one place. </h1>
            </div>}

            <div className='account-buttons'>

                <button className='facebook-button' onClick={facebookAuthentication}>
                    <img src={facebook} alt='facebook' />
                    <p> Sign in with Facebook </p>
                </button>

                <button className='google-button' onClick={googleAuthentication}>
                    <img src={google} alt='google' />
                    <p> Sign in with Google </p>
                </button>

                <div className='divider'>
                    <div className='divider-line'></div>
                    <p> OR </p>
                    <div className='divider-line'></div>
                </div>

                <Link className='email-button' to="/sign-in-email">
                    <img src={mail} alt='mail' />
                    <p> Sign in with Email </p>
                </Link>

                <div className='switch-form'>
                    <p> Don't have an account? </p> 
                    <Link to="/create-account"> Create account. </Link>
                </div>

                <div className='account-terms-policy'>
                    <p> By signing in, you agree to Sanctuary's </p>
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