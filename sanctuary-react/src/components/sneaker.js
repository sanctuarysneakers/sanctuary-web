import React from 'react'

export default function Sneaker(props) {

    return (
        <div className='sneaker'>
            <img 
                className='sneakerImg'
                src={props.image}
                alt={props.model}
            />
            <h3>{props.model}</h3>
            <img 
                className='logo'
                src={require(`../assets/images/logos/${props.source}.png`)}
                alt={props.source}
            />
        </div>
    )
}