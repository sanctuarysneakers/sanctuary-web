import React, { useState, useEffect, useRef } from "react"
import FadeIn from 'react-fade-in'
import VisibleOnScreen from "../Hooks/visibleOnScreen"
import StockX from '../../assets/images/stockx.png'
import GOAT from '../../assets/images/goat-grey.svg'
import Grailed from '../../assets/images/grailed-grey.svg'
import FlightClub from '../../assets/images/flightClub-grey.svg'
import Depop from '../../assets/images/depop-grey.svg'
import KLEKT from '../../assets/images/klekt-grey.svg'
import eBay from '../../assets/images/ebay-grey.svg'

export default function HowItWorksSites() {

    const ref1 = useRef()
    const ref2 = useRef()
    const textVisible = VisibleOnScreen(ref1)
    const sitesVisible = VisibleOnScreen(ref2)

    const [renderText, setRenderText] = useState(false)
    const [renderSites, setRenderSites] = useState(false)

    useEffect(() => {
        if (textVisible)
            setRenderText(true)
        if (sitesVisible)
            setRenderSites(true)
    }, [textVisible, sitesVisible])

    return (
        <div className="how-it-works-sites">
            <div className="how-it-works-sites-content">
                <div ref={ref1} className="how-it-works-sites-text">
                    <FadeIn visible={renderText} delay={350} transitionDuration={1200}>
                        <h1>We compare prices from all your favourite marketplaces.</h1>
                        <p>
                            Always find the best sneaker deals. Sanctuary compares prices from
                            StockX, GOAT, Flight Club, Grailed, eBay, Depop, and KLEKT with
                            many more coming soon.
                        </p>
                    </FadeIn>
                </div>

                <div ref={ref2} className="how-it-works-sites-images">
                    <FadeIn visible={renderSites} delay={300} transitionDuration={1000}>
                        <img className="how-it-works-site" src={StockX} alt='StockX Logo'/>
                        <img className="how-it-works-site goat" src={GOAT} alt='GOAT Logo'/>
                        <img className="how-it-works-site" src={FlightClub} alt='Flightclub Logo'/>
                        <img className="how-it-works-site" src={Grailed} alt='Grailed Logo'/>
                        <img className="how-it-works-site ebay" src={eBay} alt='eBay Logo'/>
                        <img className="how-it-works-site" src={Depop} alt='Depop Logo'/>
                        <img className="how-it-works-site" src={KLEKT} alt='KLEKT'/>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}