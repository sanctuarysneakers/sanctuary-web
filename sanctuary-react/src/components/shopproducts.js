import React, { useState } from 'react'
import Catalog from './catalog'
import ShopButton from './shopbutton'

export default function ShopProducts() {
    const [search, changeSearch] = useState("")
    return (
        <div>
            <h2>Results 237</h2>
            <Catalog search={search}/>
            <ShopButton link="/shop">Load More</ShopButton>
        </div>
    )
}