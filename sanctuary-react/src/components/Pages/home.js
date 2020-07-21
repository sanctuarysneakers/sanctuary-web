import React from 'react'

import Splash from "../splash"
import ProductList from "../productlist"

export default function Home() {
    return (    
    <React.Fragment>
        <Splash/>
        <ProductList/>
    </React.Fragment>
    )
}