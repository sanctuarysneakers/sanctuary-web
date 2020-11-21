import React, { useEffect, useRef } from 'react'
import { showAboutModal, shopNowScroll } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Catalog from '../catalog'
import FilterBar from '../filterbar'
import { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet'


export default function Home() {

    const dispatch = useDispatch()

    const newSearchHappened = useSelector(state => state.newSearchHappened)
    const shopNow = useSelector(state => state.shopNowScroll)


    const ref = useRef(null);
    const isInitialMount = useRef(true);

    // Properly adjust height for navbar and mobile bar
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })
    const height = use100vh()
    const recalculatedHeight = isDesktop ? height - 91 : height - 61

    const scrollToRef = (ref) => {
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
            scrollToRef(ref)
        }
    }, [newSearchHappened, shopNow])

    return (
        <div>
            <Helmet>
                <title>Sanctuary Sneakers | Home</title>
                <meta
                    name="description"
                    content="Find Your Perfect Pair! Get the best price on Jordans from your favourite websites"
                />
            </Helmet>
            <div className="splash" style={{ height: recalculatedHeight }}>
                <div className='bg-image' style={{ height: recalculatedHeight }}></div>
                <div className='splashWrap'>
                    <h1>Find Your Perfect Pair</h1>
                    <h3>Get the best price on Jordans from your favourite websites</h3>
                    <div className='twoButtons'>

                        <button className='shopNowBtn' onClick={() => dispatch(shopNowScroll())}>
                            Shop Now
                        </button>

                        <button className='aboutUsBtn' onClick={() => dispatch(showAboutModal())}>
                            About Us
                        </button>

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