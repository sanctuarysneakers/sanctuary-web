import React from 'react'
import img from '../assets/images/splashPicture.jpg'
import ShopButton from "./shopbutton"

export default function Splash() {
    return (
        <div className="splash">
            <img src={img} alt="product"/>
            <h1>Off White x Air Jordan 4 ‘Sail’</h1>
            <ShopButton link="/shop">Shop</ShopButton>
        </div>
    )
}