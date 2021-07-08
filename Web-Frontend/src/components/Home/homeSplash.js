import React from 'react'
import Fade from 'react-reveal/Fade'
import SearchBox from '../searchBox'
import { use100vh } from 'react-div-100vh'
import {ReactComponent as Shoe} from '../../assets/images/LandingShoe.svg'
import {ReactComponent as Boxes} from '../../assets/images/LandingBoxes.svg'

export default function HomeSplash() {

    const splashHeight = use100vh() - 70

    return (
        <div className='home-splash'>
            <div className='home-splash-content' style={{ height: splashHeight }}>
                <Fade bottom>
                    <div className='home-splash-text'>
                        <h1> Your favourite sneakers. </h1>
                        <h1> At the best prices. </h1>
                        <p> Sanctuary compares prices from leading sneaker websites to find you the best deals. </p>
                        <SearchBox location={'home-splash'} />
                    </div>
                </Fade>

                <div className='home-splash-graphic'>
                    <div className='jordan-1'>
                        <Shoe />
                    </div>
                    <div className='shoe-boxes'>
                        <Boxes />
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className='home-splash' style={{ height: splashHeight }}>
    //         <div className='home-splash-text'>
    //             <h2>
    //                 Your favourite sneakers.
    //             </h2>
    //             <h2> 
    //                 At the best price.
    //             </h2>
    //             <p>
    //                 Sanctuary compares prices from leading sneaker
    //                 websites to find you the best deals. It’s the one-stop
    //                 shop for all your sneaker needs.
    //             </p>

    //             <SearchBar />
    //         </div>
    //     </div>
    // )
}