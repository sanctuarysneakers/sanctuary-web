import React from 'react'
import img from '../assets/images/placeholder.jpg'

import {FiInstagram, FiTwitter, FiFacebook} from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Footer() {

    // TODO: link social media and footer pages
    return (
        <React.Fragment>

            <div className='signUp'>
                <div className='comingSoon'>
                    <h1>More Products Coming Soon</h1>
                    <h3>We continously update our database with the latest shoes just for you.</h3>
                    <p>Sign up for early access to new arrivals, promotions, and more.</p>
                    <form>
                        <input className="inputBox" type="text"/>
                        <input className="submitButton" type="submit" value="Sign Up"/>
                    </form>
                </div>
                <img src={img} alt="product"/>
            </div>

            <div className='bottomText'>
                <ul>
                    <Link >Contact Us</Link> {/* to="/contact" */}
                    <Link >Terms of Use</Link> {/* to="/terms" */}
                    <Link >Privacy Policy</Link> {/* to="/privacy" */}
                </ul>
                <div className="bottomTextIcons">
                    <FiInstagram/>
                    <FiTwitter/>
                    <FiFacebook/>
                    <h3>2020 © SANCTUARY | All Rights Reserved</h3>
                </div>
            </div>

        </React.Fragment>
    )
}