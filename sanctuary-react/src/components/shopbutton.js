import React from 'react'
import {Link} from 'react-router-dom'


export default function ShopButton(props) {
    return (
        <Link className="shopButton" to={props.link}>{props.children}</Link>
    )
}