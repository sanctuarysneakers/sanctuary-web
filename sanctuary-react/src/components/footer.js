import React, { useState } from 'react'
import img from '../assets/images/footerPic.png'

import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Footer() {

    const [email, setEmail] = useState('')
    const [emailSubmitted, setEmailSubmitted] = useState(false)

    const handleChange = event => {
        if (!emailSubmitted) {
            setEmail(event.target.value)
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()
        if (!emailSubmitted && email) {
            await fetch(email_url + email)
            setEmailSubmitted(true)
        }
    }

    let email_url = `http://flask-env.eba-wjhtntpd.us-west-2.elasticbeanstalk.com/emails?email=`

    const signUpPrompt = emailSubmitted ? "Thanks :) We've added you to the list" : "Sign up for early access to new arrivals, promotions, and more." 

    // TODO: link social media and footer pages
    return (
        <React.Fragment>

            <div className='signUp'>
                <div className='text-container'>
                    <div className='footer-content'>

                        <h1>More Products Coming Soon</h1>
                        <h3>We continously update our database with the latest and hottest shoes just for you.</h3>
                        <p>{signUpPrompt}</p>
                        <form onSubmit={handleSubmit}>
                            
                            <div className='input-container'>
                                <input
                                    className="inputBox"
                                    placeholder="Enter Email Address"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault()}}
                                />
                            </div>

                            <div className='submitButton-container'>
                                <input
                                    className="submitButton"
                                    type="submit"
                                    value="Sign Up"
                                />
                            </div>
                        </form>

                    </div>
                </div>

                <div className='img-container'>
                    <img src={img} alt="product" />
                </div>

                <div className='mobile-container'>
                    <p>{signUpPrompt}</p>
                    <form onSubmit={handleSubmit}>
                                
                        <div className='input-container'>
                            <input
                                className="inputBox"
                                placeholder="Enter Email Address"
                                type="email"
                                value={email}
                                onChange={handleChange}
                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault()}}
                            />
                        </div>

                        <div className='submitButton-container'>
                            <input
                                className="submitButton"
                                type="submit"
                                value="Sign Up"
                            />
                        </div>
                    </form>

                </div>
            </div>

            <div className='bottomText'>
                <div className='bottomText-content'>
                    <ul>
                        <Link >Contact Us</Link> {/* to="/contact" */}
                        <Link >Terms of Use</Link> {/* to="/terms" */}
                        <Link >Privacy Policy</Link> {/* to="/privacy" */}
                    </ul>
                    <div className="bottomTextIcons">
                        <div className='social-media'>
                            <FiTwitter className='twitter-icon'/>
                            <FiFacebook className='facebook-icon'/>
                            <FiInstagram className='instagram-icon'/>
                        </div>
                        <h3>2020 © SANCTUARY | All Rights Reserved</h3>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}