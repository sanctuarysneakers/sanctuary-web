import React, { useRef } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { RiCloseLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { hideAboutModal } from '../../redux/actions'
import Div100vh from 'react-div-100vh'
import { Helmet } from 'react-helmet'

import picture1 from '../../assets/images/aboutDrawing1.png'
import picture2 from '../../assets/images/aboutDrawing2.png'
import picture3 from '../../assets/images/aboutDrawing3.png'

export default function AboutModal () {
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  useOutsideAlerter(wrapperRef)

  return (
    <div className="modal-about">

      <Helmet>
        <title>Sanctuary Sneakers | About Us</title>
        <meta
          name="description"
          content="If you love sneakers, you've come to the right place!
                    Sanctuary aims to provide the best possible deals on any
                    streetwear or sneakers you could want. Our mission is to
                    evolve the paradigm of fashion by leveraging big data,
                    analytics, and artificial intelligence to provide one
                    centralized online location for finding your perfect piece."
        />
      </Helmet>

      <div className="about" ref={wrapperRef}>

        <div className='close-area'>
          <div className='closeButton'
            onClick={() => dispatch(hideAboutModal())}>
            <RiCloseLine />
          </div>
        </div>

        <div className='cardOne'>
          <div className='cardOne-content'>
            <div className='cardOne-title'>
              <h1>If you love sneakers,</h1>
              <h2>You&lsquo;ve come to the right place</h2>
            </div>
            <img src={picture1} alt="shoes" />
            <p>
              Sanctuary aims to provide the best possible deals on any
              streetwear or sneakers you could want. Our mission is to
              evolve the paradigm of fashion by leveraging big data,
              analytics, and artificial intelligence to provide one
              centralized online location for finding your perfect piece.
            </p>
          </div>
        </div>

        <div className='cardTwo'>
          <div className='cardTwo-top'>
            <h1>Our Services:</h1>
            <h2>How it works</h2>
          </div>

          <div className='cardTwo-bottom'>
            <div className='leftText'>
              <h3>Want to browse?</h3>
              <p>
                Take a scroll through our home page
                for inspiration, or check out the browse
                page to view our catalog!
              </p>

              <h3>Specific item?</h3>
              <p>
                Search for a sneaker, and we will
                provide you with the best price. We
                compare prices from StockX, GOAT,
                Grailed, eBay, Flight Club, Depop and KLEKT.
              </p>

              <h3>Ready to buy?</h3>
              <p>
                Found an item you wish to purchase?
                Simply click the “buy now” button and
                you will be redirected to the seller’s
                website.
              </p>
            </div>

            <div className='rightImage'>
              <img src={picture3} alt="shoes" />
            </div>
          </div>
        </div>

        <div className='cardThree'>
          <div className='cardThree-content'>
            <h1>More items, brands, and features soon!</h1>
            <p>
              The Sanctuary team is built on a set of core values; namely,
              innovation, creativity, and integrity. However, creating the
              best user experience, and ultimately helping our users as much
              as possible is our overarching focus.
            </p>
            <p>
              You have found Sanctuary at a very early stage. We are currently
              in early Alpha and have just begun our mission. Although our current
              stock is limited, and some functionality may be crude, we will be
              constantly updating, expanding, and improving the site. We have a team
              dedicated to making an amazing product. Any feedback or suggestions
              are welcome (see our contact page)
            </p>
            <img src={picture2} alt="shoes" />
          </div>
        </div>

        <Div100vh className='cardFour'>
          <div className='cardFour-content'>
            <h1>We love feedback!</h1>
            <h2>
              Is there something you think we could do
              better? Please feel free to contact us and
              we will get back to you shortly!
            </h2>
            <a className='contact-box'
              href = "mailto: contact@sanctuarysneakers.com">
              contact@sanctuarysneakers.com
            </a>
          </div>
        </Div100vh>
      </div>
    </div>
  )
}
