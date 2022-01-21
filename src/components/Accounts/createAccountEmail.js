import React, { useState } from 'react'
import { realm } from '../../services/realm.js'
import * as Realm from 'realm-web'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { hideHomeSearch } from '../../redux/actions'
import sanctuary from "../../assets/images/logos/sanctuary-bird-black.png"
import Footer from '../footer'

export default function CreateAccountEmail() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    // Hide the search bar
    dispatch(hideHomeSearch())

    const createAccountEmailPassword = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
        }
        else if (name === '') {
            setErrorMessage('Please enter your name.')
        }
        else {
            try {
                await realm.emailPasswordAuth.registerUser(email, password) 
                const credentials = Realm.Credentials.emailPassword(email, password) 
                await realm.logIn(credentials); 
            

                // // Get a client object for your app's custom user data collection
                // const mongo = user.mongoClient("mongodb-atlas");
                // const users = mongo.db("App").collection("User");

                // // Update the user's custom data document
                // await users.updateOne(
                //     { _id: user.id }, 
                //     { $set: { displayName: name } } //set display name 
                // );

                // // Refresh the user's local customData property
                // await user.refreshCustomData();

                history.push("/")
                window.scrollTo(0, 0)
            } catch(e) {
                setErrorMessage("Invalid credentials. Please try again.")
            }
        }
    }

    return (
        <div className='email-form'>
            <div className='email-form-content'>
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

                            <Link to="/privacy-policy" className='terms-policy-pop-up'>
                                Privacy Policy
                                </Link>

                            <p> and </p>

                            <Link to="/terms-of-use" className='terms-policy-pop-up'>
                                Terms of Use.
                                </Link>

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

            <Footer colour={'white'} />

        </div>
    )
}
