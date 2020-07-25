import React from 'react'

export default function Sneaker(props) {

    return (
        <div className='sneaker'>
            <img 
                className='sneakerImg'
                src={require(`../assets/images/${props.img}`)}
                alt={props.model}
            />
            <h3>{props.model}</h3>
            <img 
                className='logo'
                src={require(`../assets/images/logos/${props.source_site}.png`)}
                alt={props.source_site}
            />
        </div>
    )
}