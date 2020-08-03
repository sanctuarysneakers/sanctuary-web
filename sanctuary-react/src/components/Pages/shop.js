import React from 'react'
import ShopHeader from "../shopheader"
import ShopProducts from "../shopproducts"

export default function Shop(props) {

    let site = ""

    if (props.location.state) {
        site = props.location.state.site
    }

    return (    
        <React.Fragment>
            <ShopHeader site={site}/>
            <ShopProducts site={site}/>
        </React.Fragment>
        )
}