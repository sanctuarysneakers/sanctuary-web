import React from 'react'
import FadeIn from 'react-fade-in'
import SearchBox from '../Search/searchBox'
import {ReactComponent as Shoe} from '../../assets/images/LandingShoe.svg'
import {ReactComponent as Boxes} from '../../assets/images/LandingBoxes.svg'

export default function HomeSplash() {

    const clickHandler = (url) => {
        window.open(url, '_blank')
    } 

    return (
        <div className='home-splash'>
            <div className='home-splash-content'>
                <div className='home-splash-text'>
                    <FadeIn delay={200} transitionDuration={1000}>
                        <div className='home-splash-header'>
                            <h1> Your favourite sneakers. </h1>
                            <h1> At the best price. </h1>
                        </div>
                        <p> 
                            Sanctuary compares prices from leading 
                            sneaker websites to find you the best deals. 
                        </p>
                        <SearchBox/>

                        <div className='home-app-badges'>
                            <a className='home-app-ios' onClick={() => clickHandler(true, "https://apps.apple.com/us/app/sanctuary-sneaker-market-data/id1584720546?itsct=apps_box_badge&amp;itscg=30200")} >
                                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1631145600&h=c2d3945e1a59ca8a02f1ccdab253f880" alt="Download on the App Store" />
                            </a>

                            <a className='home-app-android' onClick={() => clickHandler(false, 'https://play.google.com/store/apps/details?id=com.sanctuarysneakers.mobile&hl=en_CA&gl=US&fbclid=IwAR3i_U2MWeaBzBBVcrrh03cffzVkwQRibq-fBPf0KuzMTMdTdF0JrpHVvT4&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1') }>
                                <img src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' alt='Get it on Google Play' />
                            </a>
                        </div>
                    </FadeIn>
                </div>

                <div className='home-splash-graphic'>
                    <FadeIn delay={200} transitionDuration={1000}>
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
