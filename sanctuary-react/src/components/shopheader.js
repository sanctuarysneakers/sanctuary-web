import React from 'react'

export default function ShopHeader(props) {

    return(
        <div className="shopHeader">
            <h1>{props.site ? props.site : "Shop All"}</h1>
        </div>
    )
}