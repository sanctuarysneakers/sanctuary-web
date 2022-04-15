import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAPICall from '../../hooks/useApiCall'
import VisibleOnScreen from '../../hooks/visibleOnScreen'
import FadeIn from 'react-fade-in'
import TextLoop from 'react-text-loop'
import BrandCard from './brandCard'
import Carousel from './Carousels/carousel'
import { currencySymbolMap, dealsUnderHeaders }  from '../../assets/constants'

export default function HomeTrending() {

    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)
    const [render, setRender] = useState(false)
    const [firstFlip, setFirstFlip] = useState(false)
    const [under200, setUnder200] = useState("$200")
    const [under300, setUnder300] = useState("$300")

    const currency = useSelector(state => state.currency)

    useAPICall('trending', {query: ''})
    useAPICall('under200', {query: ''})
    useAPICall('under300', {query: ''})

    const brands = ['Nike', 'Air Jordan', 'Adidas', 'Yeezy', 'New Balance', 'Converse']
    const brandCards = brands.map((item, index) => 
        <BrandCard key={item} brand={item} index={index} length={brands.length} />
    )

    useEffect(() => {
        let val200 = dealsUnderHeaders[currency][0]
        let val300 = dealsUnderHeaders[currency][1]
        setUnder200(`${currencySymbolMap[currency]}${val200}`)
        setUnder300(`${currencySymbolMap[currency]}${val300}`)
    }, [currency])

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
                            {brandCards}
                        </div>
                    </FadeIn>
                </div>

                <div className='home-trending-sneakers'>
                    <Carousel type={'trending'} />

                    <h2 className='home-trending-sneakers-header'>
                        Deals Under {under200}
                    </h2>
                    <Carousel type={'under200'} />

                    <h2 className='home-trending-sneakers-header'>
                        Deals Under {under300}
                    </h2>
                    <Carousel type={'under300'} />
                </div>

            </div>
        </div>
    )
}
