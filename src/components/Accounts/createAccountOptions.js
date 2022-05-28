import React from 'react'
import firebase from '../../services/firebase.js'
import { setRedirectUrl, hideHomeSearch } from '../../redux/actions'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import apple from "../../assets/images/logos/apple-black.png"
import facebook from "../../assets/images/logos/facebook-blue.png"
import google from "../../assets/images/logos/google.svg"
import mail from "../../assets/images/logos/mail.svg"
import Footer from '../Other/footer'

export default function CreateAccountOptions() {

    const history = useHistory()
    const dispatch = useDispatch()

    let { redirect } = useParams()
    if (redirect && redirect !== 'undefined')
        dispatch(setRedirectUrl(decodeURIComponent(redirect)))
    else redirect = null

    const googProvider = new firebase.auth.GoogleAuthProvider()
    const fbProvider = new firebase.auth.FacebookAuthProvider()
    const appleProvider = new firebase.auth.OAuthProvider('apple.com')

    async function handleAuthResult(result) {
        let user = result.user
        console.log(user)
        if (user) {
            dispatch(setUser(user))
            setLoader(false)

            if (redirect) {
                const jwt = await user.getIdToken()
                window.location.href = `${redirect}id_token=${jwt}`
            }
        } else {
            dispatch(setUser(null))
            setLoader(false)
        }
    }

    const googleAuth = () => {
        firebase.auth()
            .signInWithRedirect(googProvider)
            .then(result => handleAuthResult(result))
    }

    const facebookAuth = () => {
        firebase.auth()
            .signInWithRedirect(fbProvider)
            .then(result => handleAuthResult(result))
    }

    const appleAuth = () => {
        firebase.auth()
            .signInWithRedirect(appleProvider)
            .then(result => handleAuthResult(result))
    }

    dispatch(hideHomeSearch())

    return (
        <div className='sign-in-options'>

            <div className='sign-in-options-header'>
                <h1> Welcome to the </h1>
                <h1> future of shopping. </h1>
            </div>

            <div className='account-buttons'>

                <button className='facebook-button' onClick={facebookAuth}>
                    <img src={facebook} alt='facebook' />
                    <p> Continue with Facebook </p>
                </button>

                <button className='google-button' onClick={googleAuth}>
                    <img src={google} alt='google' />
                    <p> Continue with Google </p>
                </button>

                <button className='apple-button' onClick={appleAuth}>
                    <img src={apple} alt='apple' />
                    <p> Continue with Apple </p>
                </button>

                <div className='divider'>
                    <div className='divider-line'></div>
                    <p> OR </p>
                    <div className='divider-line'></div>
                </div>

                <Link className='email-button' to="/create-account-email">
                    <img src={mail} alt='mail' />
                    <p> Sign up with Email </p>
                </Link>

                <div className='switch-form'>
                    <p> Already have an account? </p>
                    <Link to="/sign-in"> Log in. </Link>
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

            <Footer colour={'white'} />
        </div>
    )
}