import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showAboutModal } from '../../redux/actions'
import VisibleOnScreen from '../Hooks/visibleOnScreen'
import FadeIn from 'react-fade-in'
import TextLoop from 'react-text-loop'

export default function HomeTrending() {

    const dispatch = useDispatch()
    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)
    
    const [render, setRender] = useState(false)
    const [firstFlip, setFirstFlip] = useState(false)

    useEffect(() => {
        if (isVisible && !firstFlip) {
            setRender(true)
            setFirstFlip(true)
        }
    }, [isVisible, firstFlip])

    return (
        <div className='home-trending'>
            <div className='home-trending-content'>
                
                <div ref={ref} className='home-trending-text'>
                    <FadeIn visible={render} delay={350} transitionDuration={1200}>
                        <div className='home-trending-header'>
                            <h1> Shop the hottest collections from </h1>

                            <div className='flipping-brands'>
                                <TextLoop interval={firstFlip ? 1500 : 0} fade={false}>
                                    <h1 className='nike'> Nike. </h1>
                                    <h1 className='air-jordan'> Air Jordan. </h1>
                                    <h1 className='adidas'> Adidas. </h1>
                                    <h1 className='yeezy'> Yeezy. </h1>
                                    <h1 className='new-balance'> New Balance. </h1>
                                    <h1 className='converse'> Converse. </h1>
                                </TextLoop>{" "}
                            </div>
                        </div>

                        <div className='home-trending-buttons'>
                            <Link className='home-trending-browse' onClick={() => document.location.href = '/browse'}>
                                Start browsing
                            </Link>

                            <Link className='home-trending-works' onClick={() => dispatch(showAboutModal())}>
                                See how it works
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
