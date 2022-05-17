import React from 'react'
import firebase from '../../services/firebase.js'
import { setRedirectUrl, hideHomeSearch } from '../../redux/actions'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import facebook from "../../assets/images/logos/facebook.png"
import google from "../../assets/images/logos/google.svg"
import mail from "../../assets/images/logos/mail.svg"
import Footer from '../Other/footer'

export default function SignInOptions() {

    const history = useHistory()
    const dispatch = useDispatch()

    let { redirect } = useParams()
    if (redirect && redirect !== 'undefined')
        dispatch(setRedirectUrl(decodeURIComponent(redirect)))
    
    const googProvider = new firebase.auth.GoogleAuthProvider()
    const fbProvider = new firebase.auth.FacebookAuthProvider()
    
    const googleAuth = () => {
        firebase.auth().signInWithRedirect(googProvider)
            .then(history.push('/'))
    }

    const facebookAuth = () => {
        firebase.auth().signInWithRedirect(fbProvider)
            .then(history.push('/'))
    }
    
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })

    dispatch(hideHomeSearch())

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

                <button className='facebook-button' onClick={facebookAuth}>
                    <img src={facebook} alt='facebook' />
                    <p> Sign in with Facebook </p>
                </button>

                <button className='google-button' onClick={googleAuth}>
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

            <Footer colour={'white'} />
        </div>
    )
}