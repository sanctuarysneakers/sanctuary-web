import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CurrencyFilter from '../Currency/currencyFilter'
import { ReactComponent as SanctuaryFooterLogo } from '../../assets/images/SanctuaryFooterLogo.svg'
import { ReactComponent as FacebookLogo } from '../../assets/images/facebook.svg'
import { ReactComponent as InstagramLogo } from '../../assets/images/instagram.svg'
import { ReactComponent as TwitterLogo } from '../../assets/images/twitter.svg'
import { ReactComponent as TiktokLogo } from '../../assets/images/tiktok.svg'

export default function Footer ({ color }) {
  return (
    <div className={`footer ${color}`}>
      <div className='footer-content'>
        <div className='footer-links'>
          <div className='footer-links-logos'>
            <div className='footer-logo'
              onClick={() => { document.location.href = '/' }}>
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

                <Link onClick={() => { document.location.href = '/browse/Nike%20Dunk%20Low' }} to='/browse/Nike%20Dunk%20Low'>
                  Nike Dunk Low
                </Link>

                <Link onClick={() => { document.location.href = '/browse/Air%20Jordan%201' }} to='/browse/Air%20Jordan%201'>
                  Air Jordan 1
                </Link>

                <Link onClick={() => { document.location.href = '/browse/Adidas%20Yeezy%20Boost%20350' }} to='/browse/Adidas%20Yeezy%20Boost%20350'>
                  Yeezy Boost 350
                </Link>

                <Link onClick={() => { document.location.href = '/browse/Aime%20Leon%20Dore' }} to='/browse/Aime%20Leon%20Dore'>
                  Aime Leon Dore
                </Link>
              </div>

              <div className='footer-link-text second'>
                <h2> Discover </h2>

                <Link onClick={() => { document.location.href = '/browse' }} to='/browse'>
                  Browse
                </Link>

                <Link onClick={() => { document.location.href = '/newsroom' }} to='/newsroom'>
                  Newsroom
                </Link>

                <Link onClick={() => { document.location.href = '/how-it-works' }} to='/how-it-works'>
                  How it Works
                </Link>
              </div>
            </div>

            <div className='footer-links-site-right'>

              <div className='footer-link-text last'>
                <h2> Support </h2>

                <Link onClick={() => { document.location.href = '/privacy-policy' }} to='/privacy-policy'>
                  Privacy Policy
                </Link>

                <Link onClick={() => { document.location.href = '/terms-of-use' }} to='/terms-of-use'>
                  Terms of Use
                </Link>

                <Link onClick={() => { document.location.href = '/contact-us' }} to='/contact-us'>
                  Contact Us
                </Link>
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

Footer.propTypes = {
  color: PropTypes.string
}
