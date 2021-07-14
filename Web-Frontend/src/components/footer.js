import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showAboutModal } from '../redux/actions'
import CurrencyFilter from './currencyFilter'
import { ReactComponent as SanctuaryFooterLogo } from '../assets/images/SanctuaryFooterLogo.svg'
import { ReactComponent as FacebookLogo } from '../assets/images/facebook.svg'
import { ReactComponent as InstagramLogo } from '../assets/images/instagram.svg'
import { ReactComponent as TwitterLogo } from '../assets/images/twitter.svg'
import { ReactComponent as TiktokLogo } from '../assets/images/tiktok.svg'


export default function Footer({ colour }) {

    const dispatch = useDispatch()

    return (
        <div className={`footer ${colour}`}>
            <div className='footer-content'>
                <div className='footer-links'>
                    <div className='footer-links-logos'>
                        <div className='footer-logo'
                            onClick={() => document.location.href = '/'}>
                            <SanctuaryFooterLogo />
                        </div>

                        <div className='footer-social'>
                            <a href="https://www.facebook.com/sanctuarysneakers">
                                <FacebookLogo />
                            </a>

                            <a href="https://www.instagram.com/sanctuarysneakers/">
                                <InstagramLogo />
                            </a>

                            <a href="https://twitter.com/sanctuarysnkrs">
                                <TwitterLogo />
                            </a>

                            <a href="https://www.tiktok.com/@sanctuarysneakers">
                                <TiktokLogo />
                            </a>
                        </div>
                    </div>

                    <div className='footer-links-site'>
                        <div className='footer-links-site-left'>
                            <div className='footer-link-text'>
                                <h2> Trending </h2>

                                <Link onClick={() => { document.location.href = '/browse/Nike%20Dunk%20Low' }}>
                                    Nike Dunk Low
                                </Link>

                                <Link onClick={() => { document.location.href = '/browse/Air%20Jordan%201' }}>
                                    Air Jordan 1
                                </Link>

                                <Link onClick={() => { document.location.href = '/browse/Adidas%20Yeezy%20Boost%20350' }}>
                                    Yeezy Boost 350
                                </Link>

                                <Link onClick={() => { document.location.href = '/browse/Aime%20Leon%20Dore' }}>
                                    Aime Leon Dore
                                </Link>
                            </div>

                            <div className='footer-link-text second'>
                                <h2> Discover </h2>

                                <Link onClick={() => document.location.href = '/browse'}>
                                    Browse
                                </Link>

                                <Link onClick={() => document.location.href = '/newsroom'}>
                                    Newsroom
                                </Link>

                                <Link onClick={() => dispatch(showAboutModal())}>
                                    How it Works
                                </Link>
                            </div>
                        </div>

                        <div className='footer-links-site-right'>
                            <div className='footer-link-text'>
                                <h2> Account </h2>

                                <Link onClick={() => document.location.href = '/create-account'}>
                                    Create Account
                                </Link>

                                <Link onClick={() => document.location.href = '/sign-in'}>
                                    Sign In
                                </Link>
                            </div>

                            <div className='footer-link-text last'>
                                <h2> Support </h2>

                                <Link onClick={() => document.location.href = '/privacy-policy'}>
                                    Privacy Policy
                                </Link>

                                <Link onClick={() => document.location.href = '/terms-of-use'}>
                                    Terms of Use
                                </Link>

                                <a className='footer-contact-us'
                                    href="mailto: contact@sanctuarysneakers.com">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='footer-legal-currency'>
                    <div className='footer-legal-currency-content'>
                        <p> 2021 Sanctuary Streetwear Marketplace Inc. </p>

                        {/* <CurrencyFilter /> */}
                    </div>
                </div>
            </div>
        </div>
    )









    // return (
    //     <div className='footer'>
    //         <div className='footer-wrapper'>
    //             <div className='footer-links'>
    //                 <div className='footer-links-social'>
    //                     <img className='sanctuary-logo' src={sanctuaryLogo} alt='Sanctuary' />
    //                     <p>
    //                         Sanctuary compares prices from
    //                         leading sneaker websites to find you
    //                         the best deals.
    //                     </p>
    //                     <img className='social-media' src={SocialMedia} alt='social media links' />
    //                 </div>

    //                 <div className='footer-links-map'>
    //                     <div className='footer-links-company'>
    //                         <h2> Company </h2>
    //                         <p> Shop </p>
    //                         <p> Newsroom </p>
    //                         <p> How it Works </p>
    //                         <p> About Us </p>
    //                     </div>

    //                     <div className='footer-links-account'>
    //                         <h2> Account </h2>
    //                         <p> Create Account </p>
    //                         <p> Sign In </p>
    //                     </div>

    //                     <div className='footer-links-support'>
    //                         <h2> Support </h2>
    //                         <p> Privacy Policy </p>
    //                         <p> Terms of Use </p>
    //                         <p> Contact Us </p>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='footer-legal-and-currency'>
    //                 <div className='footer-legal'>
    //                     <p> 2021 Sanctuary Streetwear Marketplace Inc. </p>
    //                 </div>

    //                 <div className='footer-currency'>
    //                     <p> Currency </p>
    //                     <img src={flag} alt='country' />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
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
