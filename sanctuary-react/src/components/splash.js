import React from 'react'
import img from '../assets/images/placeholder.jpg'
import {Link} from 'react-router-dom'

export default function Splash() {
    return (
        <div className="splash">
            <img src={img} alt="product"/>
            <h1>Off White x Air Jordan 4 ‘Sail’</h1>
            <Link to={"/shop"}>Shop</Link>
        </div>
    )
}