import React from 'react'
import Fade from 'react-reveal/Fade'
import TextLoop from 'react-text-loop'
import { Link } from 'react-router-dom'

export default function HomeTrending() {

    return (
        <div className='home-trending'>
            <div className='home-trending-content'>

                <Fade bottom>
                    <div className='home-trending-text'>
                        <h1> Shop the hottest collections from </h1>

                        <div className='flipping-brands'>
                            <TextLoop interval={1500} fade={false}>
                                <h1 className='nike'> Nike. </h1>
                                <h1 className='air-jordan'> Air Jordan. </h1>
                                <h1 className='adidas'> Adidas. </h1>
                                <h1 className='yeezy'> Yeezy. </h1>
                                <h1 className='new-balance'> New Balance. </h1>
                                <h1 className='converse'> Converse. </h1>
                            </TextLoop>{" "}
                        </div>

                        <div className='home-trending-buttons'>
                            <Link className='home-trending-browse' to='/browse'>
                                Start browsing
                            </Link>

                            <Link className='home-trending-works'>
                                See how it works
                            </Link>
                        </div>
                    </div>
                </Fade>


                <div className='home-trending-products'>
                    <div className='home-trending-sneaker'>
                    </div>

                    <div className='home-trending-sneaker'>
                    </div>

                    <div className='home-trending-sneaker'>
                    </div>
                </div>

            </div>
        </div>
    )

    // return (
    //     <div className='home-trending'>
    //         <div className='home-trending-wrapper'>
    //             <div className='home-trending-headline'>
    //                 <div className='home-trending-text'>
    //                     <h2>
    //                         Shop the hottest collections from
    //                     </h2>
    //                     <h2 className='flipping-text'>
    //                         Nike.
    //                     </h2>
    //                 </div>

    //                 <div className='home-trending-buttons'>
    //                     <div className='home-trending-browse'>
    //                         <p>
    //                             Start browsing
    //                         </p>
    //                     </div>
    //                     <div className='home-trending-how-it-works'>
    //                         <p>
    //                             See how it works
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='home-trending-products'>
    //                 <div className='home-trending-product-top'></div>
    //                 <div className='home-trending-product-middle'>
    //                     <div className='home-trending-card'></div>
    //                     <div className='home-trending-card'></div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}