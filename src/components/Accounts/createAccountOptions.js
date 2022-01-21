import React from 'react'
import * as Realm from 'realm-web'
import { realm } from '../../services/realm.js'
import { hideHomeSearch } from '../../redux/actions'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import facebook from "../../assets/images/logos/facebook.png"
import google from "../../assets/images/logos/google.svg"
import mail from "../../assets/images/logos/mail.svg"
import Footer from '../footer'

export default function CreateAccountOptions() {

    const dispatch = useDispatch()
    const history = useHistory()

    // Hide the search bar
    dispatch(hideHomeSearch())

    const googleAuthentication = () => {
        const credentials = Realm.Credentials.google(process.env.REACT_APP_REDIRECT_URL);
    
        realm.logIn(credentials).then(_ => {
            history.push("/")
            window.scrollTo(0, 0)
        }).catch((err) => console.error(err));
    }

    const facebookAuthentication = () => {
        const credentials = Realm.Credentials.facebook(process.env.REACT_APP_REDIRECT_URL);
        
        realm.logIn(credentials).then(_ => {
            history.push("/")
            window.scrollTo(0, 0)
        }).catch((err) => console.error(err));;
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