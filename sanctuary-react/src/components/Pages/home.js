import React from 'react'
import { showAboutModal } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import Catalog from '../catalog'
import FilterBar from '../filterbar'


export default function Home() {

    const dispatch = useDispatch()

    return (    
    <React.Fragment>
        <div className="splash">
            <div className='bg-image'></div>
            <div className='splashWrap'>
                <h1>Find Your Perfect Pair</h1>
                <h3>Get the best price on Jordans from your favourite websites</h3>
                <div className='twoButtons'>
                    <a href="#section-a" className="shopNowBtn"> 
                        Shop Now
                    </a>
                    <button className='aboutUsBtn' onClick={() => dispatch(showAboutModal())}>
                        About Us
                    </button>
                </div>
            </div>
        </div>

        <main className='filter-catalog'>
            <section id="section-a" className='filterrow'>
                <div className='a-wrap'>
                    <FilterBar/>
                </div>
            </section>

            <section id="section-b" className='catalogrow'>
                <div className='b-wrap'>
                <Catalog/>
                </div>
            </section>
        </main>
    </React.Fragment>
    )
}