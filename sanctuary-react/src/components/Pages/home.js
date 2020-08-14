import React from 'react'
import { showAboutModal } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import img from '../../assets/images/heroImage.jpg'
import Catalog from '../catalog'
import FilterBar from '../filterbar'


export default function Home() {

    const dispatch = useDispatch()

    return (    
    <React.Fragment>
        <div className="splash">
            <img src={img} alt="product"/>
            <h1>Find Your Perfect Pair</h1>
            <h3>Get the best price on Jordans from your favourite websites</h3>
            <button onClick={() => dispatch(showAboutModal())}>
                About Us
            </button>
            <a href="#shop-now" className="ShopNowButton"> 
                Shop Now
            </a>
            <div id="shop-now"></div>
        </div>
        <FilterBar/>
        <Catalog/>
    </React.Fragment>
    )
}