import React from 'react'
import { Link } from 'react-router-dom'
import CurrencyFilter from './currencyFilter'
import { ReactComponent as SanctuaryFooterLogo } from '../assets/images/SanctuaryFooterLogo.svg'
import { ReactComponent as FacebookLogo } from '../assets/images/facebook.svg'
import { ReactComponent as InstagramLogo } from '../assets/images/instagram.svg'
import { ReactComponent as TwitterLogo } from '../assets/images/twitter.svg'
import { ReactComponent as TiktokLogo } from '../assets/images/tiktok.svg'


export default function Footer({ colour }) {

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

                                <Link onClick={() => document.location.href = '/how-it-works'}>
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

                        <CurrencyFilter />
                    </div>
                </div>
            </div>
        </div>
    )
}
