import React, { useState, useEffect, useRef } from "react"
import FadeIn from 'react-fade-in'
import VisibleOnScreen from "../Hooks/visibleOnScreen"
import { ReactComponent as Shoe } from '../../assets/images/nike-dunk.svg'
import { ReactComponent as Buttons } from '../../assets/images/item-buttons.svg'
import { ReactComponent as Prices } from '../../assets/images/market-prices.svg'
import { ReactComponent as Listings } from '../../assets/images/more-listings.svg'

export default function HowItWorksCards() {

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()

    const browseVisible = VisibleOnScreen(ref1)
    const buttonsVisible = VisibleOnScreen(ref2)
    const pricesVisible = VisibleOnScreen(ref3)
    const listingsVisible = VisibleOnScreen(ref4)

    const [renderBrowse, setRenderBrowse] = useState(false)
    const [renderButtons, setRenderButtons] = useState(false)
    const [renderPrices, setRenderPrices] = useState(false)
    const [renderListings, setRenderListings] = useState(false)

    useEffect(() => {
        if (browseVisible)
            setRenderBrowse(true)
        if (buttonsVisible)
            setRenderButtons(true)
        if (pricesVisible)
            setRenderPrices(true)
        if (listingsVisible)
            setRenderListings(true)
    }, [browseVisible, buttonsVisible, pricesVisible, listingsVisible])

    return (
        <div className="how-it-works-cards">
            <div className="how-it-works-cards-content">
                <div className="how-it-works-card">
                    <div className="how-it-works-card-content">
                        <div ref={ref1} className="how-it-works-card-text browse">
                            <FadeIn visible={renderBrowse} delay={350} transitionDuration={1200}>
                                <h1>Browse the latest drops.</h1>
                            </FadeIn>
                        </div>

                        <div className="how-it-works-card-shoe">
                            <Shoe />
                        </div>
                    </div>
                </div>

                <div className="how-it-works-card">
                    <div className="how-it-works-card-content">
                        <div ref={ref2} className="how-it-works-card-text buy">
                            <FadeIn visible={renderButtons} delay={350} transitionDuration={1200}>
                                <h1>Instantly see the best price.</h1>
                            </FadeIn>
                        </div>

                        <div className="how-it-works-card-buttons">
                            <Buttons />
                        </div>
                    </div>
                </div>

                <div className="how-it-works-card">
                    <div className="how-it-works-card-content">
                        <div ref={ref3} className="how-it-works-card-text price">
                            <FadeIn visible={renderPrices} delay={350} transitionDuration={1200}>
                                <h1>Compare all market prices.</h1>
                            </FadeIn>
                        </div>

                        <div className="how-it-works-card-prices">
                            <Prices />
                        </div>
                    </div>
                </div>

                <div className="how-it-works-card last">
                    <div className="how-it-works-card-content">
                        <div ref={ref4} className="how-it-works-card-text listings">
                            <FadeIn visible={renderListings} delay={350} transitionDuration={1200}>
                                <h1>Check pre-owned prices.</h1>
                            </FadeIn>
                        </div>

                        <div className="how-it-works-card-listings">
                            <Listings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
