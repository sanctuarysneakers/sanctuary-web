import React from 'react'
import SearchBar from '../searchbar'
import { use100vh } from 'react-div-100vh'

export default function HomeSplash() {

    const splashHeight = use100vh() - 71

    return (
        <div className='home-splash' style={{ height: splashHeight }}>
            <div className='home-splash-text'>
                <h2>
                    Your favourite sneakers.
                </h2>
                <h2> 
                    At the best price.
                </h2>
                <p>
                    Sanctuary compares prices from leading sneaker
                    websites to find you the best deals. It’s the one-stop
                    shop for all your sneaker needs.
                </p>

                <SearchBar />
            </div>
        </div>
    )
}