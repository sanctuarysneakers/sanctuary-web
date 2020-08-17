import React, { useRef } from 'react'
import useOutsideAlerter from '../useoutsidealerter'

import img from '../../assets/images/placeholder.jpg'
import picture2 from '../../assets/images/aboutPic2.jpg'


export default function AboutModal() {

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    return (
    <div className="modal">
        <div className="about" ref={wrapperRef}>

            <div className='cardOne'>
                <h1>If you love sneakers,</h1>
                <h2>You've come to the right place</h2>
                <img src={img} alt="shoes"/>
                <p>
                    At Sanctuary, we aim to provide you with the best possible 
                    deals for the streetwear items you love. Our mission is not 
                    only to act as an online marketplace but also a central 
                    location for streetwear market data.
                </p>
            </div>

            <div className='cardTwo'>
                <h1>More items, brands, and features soon!</h1>
                <p>
                    Sanctuary was founded by five like-minded individuals with 
                    aspirations to revolutionize the fashion industry. As 
                    individuals, we strive to create a global hub for streetwear 
                    market data through our core values of innovation, 
                    creativity, originality, and integrity.
                </p>
                <p>
                    Our services are currently limited to Air Jordans, however, 
                    our team is continuously working on updating our database 
                    to provide you with a wide range of streetwear products.
                </p>
                <img src={picture2} alt="shoes"/>
            </div>

            <div className='cardThree'>
                <h1>Our Services:</h1>
                <h2>How it works</h2>
                <img src={img} alt="shoes"/>
                <h3>Looking for a specific site?</h3>
                <p>
                    Browse each website by row 
                    right on the homepage.
                </p>

                <h3>Specific filters?</h3>
                <p>
                    Customize filters such as size 
                    and price to find the exact 
                    model of sneaker you desire.
                </p>

                <h3>Specific items in mind?</h3>
                <p>
                    Search for a sneaker you love, 
                    and we will compare prices from 
                    FlightClub, Goat, Grailed, and StockX 
                    to provide with the best price.
                </p>

                <h3>Ready to buy?</h3>
                <p>
                    Simply click the “Buy Now” button 
                    and you’ll be redirected to the 
                    website that is providing your 
                    item for its desired price!
                </p>
            </div>

            <div className='cardFour'>
                <h1>We love feedback!</h1>
                <h2>
                    Is there something you think we could do
                    better? Please feel free to contact us and 
                    we will get back to you shortly!
                </h2>
                <h3>
                    email@email.com
                </h3>
            </div> 
        </div>
    </div>
    )
}