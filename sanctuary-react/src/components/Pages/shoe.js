import React from 'react'
import { useSelector } from 'react-redux'


export default function Shoe() {
    const shoe = useSelector(state => state.shoe)

    return (
    <div className="shoe-grid">

        <div className="shoe-model">
            <h2>{shoe.model}</h2>
        </div>

        <div className="shoe-image">
            <img 
                src={shoe.image}
                alt={shoe.model}
            />
        </div>

        <div className="shoe-price">
            <h3>Price</h3>
            <span>{shoe.price}</span>
        </div>

        <div className="shoe-size">
            <h3>Size</h3>
            <span>{shoe.size}</span>
        </div>

        <div className="shoe-condition">
            <h3>Condition</h3>
            <span>idk man</span>
        </div>

        <div className="shoe-source">
            {shoe.source &&
                <img 
                    src={require(`../../assets/images/logos/${shoe.source.toLowerCase()}.png`)}
                    alt={shoe.source}
                />
            }
        </div>

        <div className="shoe-buy"> 
            <h2>Buy Now</h2>
        </div>

    </div>
    )
}