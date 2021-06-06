import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import sanctuaryLogo from "../assets/images/sanctuary-black.png"
import SocialMedia from "../assets/images/socialMedia.png"
import flag from "../assets/images/flag.png"

import img from '../assets/images/footerDrawing.webp'
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'


export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-wrapper'>
                <div className='footer-links'>
                    <div className='footer-links-social'>
                        <img className='sanctuary-logo' src={sanctuaryLogo} alt='Sanctuary' />
                        <p>
                            Sanctuary compares prices from
                            leading sneaker websites to find you
                            the best deals.
                        </p>
                        <img className='social-media' src={SocialMedia} alt='social media links' />
                    </div>

                    <div className='footer-links-map'>
                        <div className='footer-links-company'>
                            <h2> Company </h2>
                            <p> Shop </p>
                            <p> Newsroom </p>
                            <p> How it Works </p>
                            <p> About Us </p>
                        </div>

                        <div className='footer-links-account'>
                            <h2> Account </h2>
                            <p> Create Account </p>
                            <p> Sign In </p>
                        </div>

                        <div className='footer-links-support'>
                            <h2> Support </h2>
                            <p> Privacy Policy </p>
                            <p> Terms of Use </p>
                            <p> Contact Us </p>
                        </div>
                    </div>
                </div>

                <div className='footer-legal-and-currency'>
                    <div className='footer-legal'>
                        <p> 2021 Sanctuary Streetwear Marketplace Inc. </p>
                    </div>

                    <div className='footer-currency'>
                        <p> Currency </p>
                        <img src={flag} alt='country' />
                    </div>
                </div>
            </div>
        </div>
    )
}


// export default function Footer() {

//     const [email, setEmail] = useState('')
//     const [emailSubmitted, setEmailSubmitted] = useState(false)

//     const handleChange = event => {
//         if (!emailSubmitted) {
//             setEmail(event.target.value)
//         }
//     }

//     const handleSubmit = async event => {
//         event.preventDefault()
//         if (!emailSubmitted && email) {
//             await fetch(email_url + email)
//             setEmailSubmitted(true)
//         }
//     }

//     let email_url = `https://sanctuaryapi.net/emails?email=`

//     const signUpPrompt = emailSubmitted ? "Thanks :) We've added you to the list" : "Sign up for early access to new arrivals, promotions, and more."

//     return (
//         <div className='bottomText'>
//             <div className='bottomText-content'>
//                 <ul>
//                     <button>
//                         <a className="contact-link"
//                             href="mailto: contact@sanctuarysneakers.com">
//                             Contact Us</a>
//                     </button>
//                     <button>
//                         <Link to="/terms-of-use">
//                             Terms of Use
//                             </Link>
//                     </button>
//                     <button>
//                         <Link to="/privacy-policy">
//                             Privacy Policy
//                             </Link>
//                     </button>
//                 </ul>
//                 <div className="bottomTextIcons">
//                     <div className='social-media'>
//                         <a href="https://twitter.com/sanctuarysnkrs"><FiTwitter className='twitter-icon' /></a>
//                         <a href="https://www.facebook.com/sanctuarysneakers"><FiFacebook className='facebook-icon' /></a>
//                         <a href="https://www.instagram.com/sanctuarysneakers/"><FiInstagram className='instagram-icon' /></a>
//                     </div>
//                     <h3>2021 Sanctuary Streetwear Marketplace Inc.</h3>
//                 </div>
//             </div>
//         </div>
//     )
// }
