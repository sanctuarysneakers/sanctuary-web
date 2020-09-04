import React, { useRef, useEffect } from 'react'
import useOutsideAlerter from '../useoutsidealerter'
import { RiCloseLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { hideAboutModal } from '../../redux/actions'
import Div100vh from 'react-div-100vh'

import picture1 from '../../assets/images/aboutPic1.jpg'
import picture2 from '../../assets/images/aboutPic2.jpg'
import picture3 from '../../assets/images/aboutPic3.jpg'


export default function AboutModal() {

    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    return (
        <div className="modal-about">

            <div className="about" ref={wrapperRef}>

                <div className='closeButton'
                    onClick={() => dispatch(hideAboutModal())}>
                    <RiCloseLine />
                </div>

                <div className='cardOne'>
                    <h1>If you love sneakers,</h1>
                    <h2>You've come to the right place</h2>
                    <img src={picture1} alt="shoes" />
                    <p>
                        Sanctuary aims to provide the best possible deals on any
                        streetwear or sneakers you could want. Our mission is to
                        evolve the paradigm of fashion by leveraging big data,
                        analytics, and artificial intelligence to provide one
                        centralized online location for finding your perfect piece.
                </p>
                </div>

                <div className='cardThree'>
                    <h1>Our Services:</h1>
                    <h2>How it works</h2>

                    <div className='bottom'>
                        <div className='leftText'>
                            <h3>Specific site?</h3>
                            <p>
                                On the homepage, browse websites
                                by row.
                        </p>

                            <h3>Specific filters?</h3>
                            <p>
                                Customize filters such as size,
                                condition, and price.
                        </p>

                            <h3>Specific item?</h3>
                            <p>
                                Search for a sneaker, and we will
                                provide you with the best price. We
                                compare prices from StockX, Goat,
                                Grailed, and FlightClub.
                        </p>

                            <h3>Ready to buy?</h3>
                            <p>
                                Found an item you wish to purchase?
                                Simply click the “buy now” button and
                                you will be redirected to the seller’s
                                website.
                        </p>
                        </div>
                        <img src={picture3} alt="shoes" />
                    </div>
                </div>

                <div className='cardTwo'>
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

                <Div100vh className='cardFour'>
                    <div className='fourWrap'>
                        <h1>We love feedback!</h1>
                        <h2>
                            Is there something you think we could do
                            better? Please feel free to contact us and
                            we will get back to you shortly!
                    </h2>

                        <div className='box'>
                            <button> contact@sanctuarysneakers.com </button>
                        </div>
                    </div>
                </Div100vh>
            </div>
        </div>
    )
}