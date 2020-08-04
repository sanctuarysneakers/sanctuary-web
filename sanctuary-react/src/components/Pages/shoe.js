import React, { useState } from 'react'

export default function Shoe(props) {
    // TODO: save the shoe variable in state so when it renders without the prop it doesn't crash
    // TODO: direct navigation to /shoe crashes because there is no <shoe> to render
    const [shoe, changeShoe] = useState(props.location.state.sneaker)

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
            <h3>Price</h3>
            <span>5</span>
        </div>

        <div className="shoe-condition">
            <h3>Condition</h3>
            <span>idk man</span>
        </div>

        <div className="shoe-source">
            <img 
                src={require(`../../assets/images/logos/${shoe.source.toLowerCase()}.png`)}
                alt={shoe.source}
            />
        </div>

        <div className="shoe-buy"> 
            <h2>Buy Now</h2>
        </div>

    </div>
    )
}