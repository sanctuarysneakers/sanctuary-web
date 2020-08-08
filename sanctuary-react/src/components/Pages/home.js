import React from 'react'
import img from '../../assets/images/splashPicture.jpg'
import Catalog from '../catalog'
import FilterBar from '../filterbar'


export default function Home() {
    return (    
    <React.Fragment>
        <div className="splash">
            <img src={img} alt="product"/>
            <h1>Off White x Air Jordan 4 ‘Sail’</h1>
        </div>
        <FilterBar/>
        <Catalog/>
    </React.Fragment>
    )
}