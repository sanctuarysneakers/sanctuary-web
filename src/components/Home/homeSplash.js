import React from 'react'
import FadeIn from 'react-fade-in'
import SearchBox from '../searchBox'
import {ReactComponent as Shoe} from '../../assets/images/LandingShoe.svg'
import {ReactComponent as Boxes} from '../../assets/images/LandingBoxes.svg'

export default function HomeSplash() {

    return (
        <div className='home-splash'>
            <div className='home-splash-content'>
                <div className='home-splash-text'>
                    <FadeIn delay={150} transitionDuration={600}>
                        <h1> Your favourite sneakers. </h1>
                        <h1> At the best price. </h1>
                        <p> Sanctuary compares prices from leading sneaker websites to find you the best deals. </p>
                        <SearchBox location={'home-splash'} />
                    </FadeIn>
                </div>

                <div className='home-splash-graphic'>
                    <FadeIn delay={150} transitionDuration={600}>
                        <div className='jordan-1'>
                            <Shoe />
                        </div>
                        <div className='shoe-boxes'>
                            <Boxes />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}