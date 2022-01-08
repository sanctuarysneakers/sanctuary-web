import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Realm from 'realm-web'
import { realm } from '../../services/realm.js'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import { hideHomeSearch } from '../../redux/actions'
import sanctuary from "../../assets/images/logos/sanctuary-bird-black.png"
import Footer from '../footer'

export default function SignInEmail() {
    // TODO: Change these initial values to empty strings LOL
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // Hide the search bar
    dispatch(hideHomeSearch())

    const signInEmailPassword = async () => {
        
        try{
            const credentials = Realm.Credentials.emailPassword(email, password) 
            const user = await realm.logIn(credentials); 

            console.log(`Logged in with id: ${user.id}`);

            history.push("/")
            window.scrollTo(0, 0)
        } catch(e) {
            setErrorMessage("Invalid credentials. Please try again.")
        }
    }

    return (
        <div className='email-form'>
            <div className='email-form-content'>
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

                            <Link to="/privacy-policy" className='terms-policy-pop-up'>
                                Privacy Policy
                                </Link>

                            <p> and </p>

                            <Link to="/terms-of-use" className='terms-policy-pop-up'>
                                Terms of Use.
                                </Link>

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

            <Footer colour={'white'} />

        </div>
    )
}
