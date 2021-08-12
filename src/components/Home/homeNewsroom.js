import React, { useRef, useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
import Slider from 'react-slick'
import VisibleOnScreen from '../Hooks/visibleOnScreen'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import sanctuary3D from '../../assets/images/3D-sanctuary-small.gif'

export default function HomeNewsroom() {

    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)
    const sliderRef = useRef()

    const [render, setRender] = useState(false)
    const [firstFlip, setFirstFlip] = useState(false)

    const sliderSettings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 6000,
        pauseOnHover: false,
        variableWidth: true
    }

    useEffect(() => {
        if (isVisible)
            setRender(true)
    }, [isVisible])

    useEffect(() => {
        if (!isVisible && !firstFlip) {
            sliderRef.current.slickPause()
        }
        else if (isVisible && !firstFlip) {
            setFirstFlip(true)
            sliderRef.current.slickPlay()
        }
    }, [isVisible, firstFlip])

    return (
        <div className='home-newsroom'>
            <div className='home-newsroom-content'>

                <div ref={ref} className='home-newsroom-text'>
                    <FadeIn visible={render} delay={350} transitionDuration={1500}>
                        <h1> Everything you need to know about sneakers is here. </h1>
                        <p>
                            Stay up to date with the latest Sanctuary news and original articles.
                            It's the ultimate place for all sneakerheads alike, curated by our team.
                        </p>
                        <div className='home-newsroom-read'
                            onClick={() => document.location.href = '/newsroom'}>
                            Start reading
                        </div>
                    </FadeIn>
                </div>

                <div className='home-newsroom-articles'>
                    <Slider {...sliderSettings} ref={sliderRef}>
                        <div style={{ width: 1020 }}>
                            <div className='home-newsroom-a4'
                                onClick={() => document.location.href = '/article-introduction'}>

                                <img className='home-newsroom-a4-image' src={sanctuary3D} alt='spinning logo' />
                                <div className='home-newsroom-article-gradient sanctuary'>
                                    <div className='home-newsroom-article-content'>
                                        <p> January 31, 2021 </p>
                                        <h2> Sanctuary: Our story </h2>
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
                    </Slider>
                </div>
            </div>
        </div>
    )
}