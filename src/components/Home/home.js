import React from 'react'
import { useDispatch } from 'react-redux'
import { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet'
import { recordSplashHeight } from '../../redux/actions'
import HomeSplash from './homeSplash'
import HomeTrending from './homeTrending'
import HomeBrandCarousel from './homeBrandCarousel' 
import HomeCarousel from './homeCarousel'
import HomeNewsroom from './homeNewsroom'
import HomeApp from './homeApp'
import Footer from '../footer'

export default function Home() {

    const dispatch = useDispatch()

    // Properly adjust height for navbar and mobile bar
    const isDesktop = useMediaQuery({
        query: '(min-width: 1120px)'
    })
    const height = use100vh()
    const splashHeight = isDesktop ? height - 70 : height - 60
    dispatch(recordSplashHeight(splashHeight))

    return (
        <div>
            <Helmet>
                <title>Sanctuary: Sneaker Price Comparison and Market Data</title>
                <meta
                    name="description"
                    content="Sanctuary Sneakers collects all available sneaker market data in one place so you can 
                             compare and find the best prices. Sanctuary lets you see real-time prices, new inventory, 
                             and more information for both new and used sneakers from several trusted online stores so 
                             you don't have to! Stay up-to-date with price drop alerts, and release reminders."
                />
            </Helmet>

            <HomeSplash />
            <HomeTrending />
            {/* <div className='carousels'>
                <HomeBrandCarousel />
                <HomeCarousel type={'trending'}/>
                <HomeCarousel type={'under200'}/>
                <HomeCarousel type={'under300'}/>
            </div> */}
            <HomeNewsroom />
            <HomeApp />
            <Footer colour={'white'} />
        </div>
    )
}