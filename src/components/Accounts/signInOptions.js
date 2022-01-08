import React from 'react'
import Realm from 'realm'
import realm from '../../services/realm.js'
import { hideHomeSearch } from '../../redux/actions'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import facebook from "../../assets/images/logos/facebook.png"
import google from "../../assets/images/logos/google.svg"
import mail from "../../assets/images/logos/mail.svg"
import Footer from '../footer'

export default function SignInOptions() {

    const dispatch = useDispatch()
    const history = useHistory()
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })

    // Hide the search bar
    dispatch(hideHomeSearch())

    const googleAuthentication = () => {
        // Get Google credentials using Realm SDK
        const redirectUri = process.env.REACT_APP_SIGN_IN_URL;
        const credentials = Realm.Credentials.google(redirectUri);
       
        //Log the user in to your app
        realm.logIn(credentials).then((user) => {
            console.log(`Logged in with id: ${user.id}`);
            history.push("/"),
            window.scrollTo(0, 0)
        }).catch((err) => console.error(err));
    }

    const facebookAuthentication = () => {
        // Get FB credentials using Realm SDK
        const redirectUri = process.env.REACT_APP_SIGN_IN_URL;
        const credentials = Realm.Credentials.facebook(redirectUri);
        
         //Log the user in to your app
        realm.logIn(credentials).then(user => {
            console.log(`Logged in with id: ${user.id}`);
            history.push("/"),
            window.scrollTo(0, 0)
        });
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