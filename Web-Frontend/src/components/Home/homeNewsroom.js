import React, { useRef, useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
import Slider from 'react-slick'
import VisibleOnScreen from '../Hooks/visibleOnScreen'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeNewsroom() {

    const [render, setRender] = useState(false)

    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)

    const settings = {
        className: "slider variable-width",
        dots: true,
        // autoplay: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 6000,
        pauseOnHover: false,
        variableWidth: true
    }

    useEffect(() => {
        if (isVisible) {
            setRender(true)
        }
    })

    return (
        <div className='home-newsroom'>
            <div className='home-newsroom-content'>

                <div ref={ref} className='home-newsroom-text'>
                    <FadeIn visible={render} delay={300} transitionDuration={500}>
                        <h1> Everything you need to know about sneakers is here. </h1>
                        <p>
                            Stay up to date with the latest Sanctuary news and original articles.
                            It's the ultimate place for all sneakerheads alike; curated by our team.
                        </p>
                        <div className='home-newsroom-read' 
                            onClick={() => document.location.href = '/newsroom'}>
                                Start reading
                        </div>
                    </FadeIn>
                </div>

                <div className='home-newsroom-articles'>
                    <Slider {...settings}>
                        <div style={{ width: 1020 }}>
                            <div className='home-newsroom-a1'
                                onClick={() => document.location.href = '/article-sneakersmeetengineering'}>

                                <div className='home-newsroom-a1-image' />
                                <div className='home-newsroom-article-gradient'>
                                    <div className='home-newsroom-article-content'>
                                        <p> March 28, 2021 </p>
                                        <h2> How Adidas and Carbon3D are revolutionizing sneaker production </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: 1020 }}>
                            <div className='home-newsroom-a2'
                                onClick={() => document.location.href = '/article-demystifying'}>

                                <div className='home-newsroom-a2-image' />
                                <div className='home-newsroom-article-gradient'>
                                    <div className='home-newsroom-article-content'>
                                        <p> March 29, 2021 </p>
                                        <h2> Demystifying the sneaker market </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: 1020 }}>
                            <div className='home-newsroom-a3'
                                onClick={() => document.location.href = '/article-toppicks'}>

                                <div className='home-newsroom-a3-image' />
                                <div className='home-newsroom-article-gradient'>
                                    <div className='home-newsroom-article-content'>
                                        <p> April 20, 2021 </p>
                                        <h2> Our favourite sneakers of 2020 </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: 1020 }}>
                            <div className='home-newsroom-a4'
                                onClick={() => document.location.href = '/article-introduction'}>

                                <div className='home-newsroom-a4-image' />
                                <div className='home-newsroom-article-gradient sanctuary'>
                                    <div className='home-newsroom-article-content'>
                                        <p> January 31, 2021 </p>
                                        <h2> Sanctuary: Our story </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )



    // const settings = {
    //     centerMode: true,
    //     infinite: true,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     centerPadding: '210px',
    //     slidesToShow: 1,
    //     dots: true,
    //     pauseOnHover: false
    // }

    // return (
    //     <div className='home-newsroom'>
    //         <div className='home-newsroom-content'>

    //             <Fade bottom>
    //                 <div className='home-newsroom-text'>
    //                     <h1> Everything you need to know about sneakers is here. </h1>
    //                     <p>
    //                         Stay up to date with the latest Sanctuary news and original articles. 
    //                         It's the ultimate place for all sneakerheads alike; curated by our team.
    //                     </p>
    //                     <Link className='home-newsroom-read' to='/newsroom'>
    //                         Start reading
    //                     </Link>
    //                 </div>
    //             </Fade>

    //             <div className='home-newsroom-articles'>
    //                 <Slider {...settings}>
    //                     <div className='home-newsroom-article'>
    //                         <h2> first </h2>
    //                     </div>
    //                     <div className='home-newsroom-article'>
    //                         <h2> second </h2>
    //                     </div>
    //                     <div className='home-newsroom-article'>
    //                         <h2> third </h2>
    //                     </div>
    //                     <div className='home-newsroom-article'>
    //                         <h2> fourth </h2>
    //                     </div>
    //                 </Slider>
    //             </div>
    //         </div>
    //     </div>
    // )





    // return (
    //     <div className='home-newsroom'>
    //         <div className='home-newsroom-wrapper'>
    //             <div className='home-newsroom-headline'>
    //                 <div className='home-newsroom-text'>
    //                     <h2>
    //                         Everything you need to know about sneakers is here.
    //                     </h2>
    //                     <p>
    //                         Stay up to date with the latest Sanctuary news and headlines
    //                         within the industry. It’s the ultimate place for all sneakerheads
    //                         alike; curated by our team.
    //                     </p>
    //                 </div>

    //                 <div className='home-newsroom-buttons'>
    //                     <div className='home-newsroom-read-now'>
    //                         <p>
    //                             Start reading now
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='home-newsroom-articles'>
    //                 <div className='home-newsroom-article1'></div>
    //                 <div className='home-newsroom-article2'></div>
    //                 <div className='home-newsroom-article3'></div>
    //             </div>
    //         </div>
    //     </div>
    // )
}