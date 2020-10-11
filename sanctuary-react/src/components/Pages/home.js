import React from 'react'
import { showAboutModal } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import Catalog from '../catalog'
import FilterBar from '../filterbar'
import { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-scroll'
import { Helmet } from 'react-helmet'


export default function Home() {

    const dispatch = useDispatch()
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })
    const height = use100vh()
    const recalculatedHeight = isDesktop ? height - 91 : height - 61 
    const filterHeight = isDesktop ? -91 : -61

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

                        <Link className="shopNowBtn"
                            activeClass="active"
                            to="section-a"
                            spy={true}
                            smooth={true}
                            offset={filterHeight}
                            duration= {600}
                        > Shop Now </Link>

                        <button className='aboutUsBtn' onClick={() => dispatch(showAboutModal())}>
                            About Us
                        </button>

                    </div>
                </div>
            </div>

            <main className='filter-catalog'>
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