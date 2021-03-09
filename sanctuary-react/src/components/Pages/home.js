import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Catalog from '../catalog'
import FilterBar from '../filterbar'
import { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet'
import SearchBar from '../searchbar'
import { recordSplashHeight, showHomeSeach } from '../../redux/actions'


export default function Home() {

    const dispatch = useDispatch()

    // Properly adjust height for navbar and mobile bar
    const isDesktop = useMediaQuery({
        query: '(min-width: 1120px)'
    })
    const height = use100vh()
    const splashHeight = isDesktop ? height - 91 : height - 61
    dispatch(recordSplashHeight(splashHeight))

    // Show the Search bar
    dispatch(showHomeSeach())

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
            <div className="splash" style={{ height: splashHeight }}>
                <div className='bg-image' style={{ height: splashHeight }}></div>
                <div className='splashWrap'>
                    <h1>Find Your Perfect Pair</h1>
                    <h3>Get the best price on sneakers from your favourite websites</h3>
                    <div className='middleSearchbar'>
                        <SearchBar />
                    </div>
                </div>
            </div>

            <main
                className='filter-catalog'
            >
                <section id="section-a" className='filterrow'>
                    <div className='a-wrap'>
                        <FilterBar />
                    </div>
                </section>

                <section id="section-b" className='catalogrow'>
                    <div className='b-wrap'>
                        <Catalog />
                    </div>
                </section>
            </main>
        </div>
    )
}