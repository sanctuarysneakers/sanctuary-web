import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Catalog from '../catalog'
import FilterBar from '../filterbar'
import { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet'
import SearchBar from '../searchbar'
import { hideSearchBar, showSearchBar } from '../../redux/actions'


export default function Home() {

    const dispatch = useDispatch()
    const newSearchHappened = useSelector(state => state.newSearchHappened)

    const ref = useRef(null);
    const isInitialMount = useRef(true);

    // Properly adjust height for navbar and mobile bar
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })
    const height = use100vh()
    const recalculatedHeight = isDesktop ? height - 91 : height - 61

    const scrollToCatalog = () => {
        const location = isDesktop ? ref.current.offsetTop - 91 : ref.current.offsetTop - 61
        // Only scroll if the window is above the start of the catalog
        if (window.scrollY < location) {
            window.scrollTo(0, location)
        }
    }

    // The effects do not happen on the first mount
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            scrollToCatalog()
        }
    }, [newSearchHappened])

    return (
        <div>
            <Helmet>
                <title>Sanctuary: Sneaker Price Comparison & Market Data</title>
                <meta
                    name="description"
                    content="Sanctuary Sneakers collects all available sneaker market data in one place so you can 
                             compare and find the best prices. Sanctuary lets you see real-time prices, new inventory, 
                             and more information for both new and used sneakers from several trusted online stores so 
                             you don't have to! Stay up-to-date with price drop alerts, and release reminders."
                />
            </Helmet>
            <div className="splash" style={{ height: recalculatedHeight }}>
                <div className='bg-image' style={{ height: recalculatedHeight }}></div>
                <div className='splashWrap'>
                    <h1>Find Your Perfect Pair</h1>
                    <h3>Get the best price on sneakers from your favourite websites</h3>
                    <div className='twoButtons'>
                        <SearchBar />
                    </div>
                </div>
            </div>

            <main
                className='filter-catalog'
                ref={ref}
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