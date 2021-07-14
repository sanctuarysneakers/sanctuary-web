import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showAboutModal } from '../../redux/actions'
import VisibleOnScreen from '../Hooks/visibleOnScreen'
import FadeIn from 'react-fade-in'
import TextLoop from 'react-text-loop'
import nikeDunk from '../../assets/images/nikeDunk.png'
import airJordan1 from '../../assets/images/airJordan1.png'
import airMax from '../../assets/images/airMax.png'

export default function HomeTrending() {

    const [render, setRender] = useState(false)

    const ref = useRef()
    const dispatch = useDispatch()
    const isVisible = VisibleOnScreen(ref)

    useEffect(() => {
        if (isVisible) {
            setRender(true)
        }
    })

    return (
        <div className='home-trending'>
            <div className='home-trending-content'>
                
                <div ref={ref} className='home-trending-text'>
                    <FadeIn visible={render} delay={250} transitionDuration={500}>
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

                            <Link className='home-trending-works' onClick={() => dispatch(showAboutModal())}>
                                See how it works
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                <div className='home-trending-products'>
                    <div className='home-trending-sneaker' 
                        onClick={() => document.location.href = '/browse/Nike%20Dunk%20Low'}>
                            
                        <div className='home-trending-sneaker-img'>
                            <img src={nikeDunk} alt='featured sneaker' />
                        </div>

                        <div className='home-trending-sneaker-text'>
                            <p> Nike Dunk Low </p>
                        </div>
                    </div>

                    <div className='home-trending-sneaker' 
                        onClick={() => document.location.href = '/browse/Air%20Jordan%201'}>

                        <div className='home-trending-sneaker-img'>
                            <img src={airJordan1} alt='featured sneaker' />
                        </div>

                        <div className='home-trending-sneaker-text'>
                            <p> Air Jordan 1 </p>
                        </div>
                    </div>

                    <div className='home-trending-sneaker' 
                        onClick={() => document.location.href = '/browse/Nike%20Air%20Max'}>

                        <div className='home-trending-sneaker-img'>
                            <img src={airMax} alt='featured sneaker' />
                        </div>

                        <div className='home-trending-sneaker-text'>
                            <p> Nike Air Max </p>
                        </div>
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