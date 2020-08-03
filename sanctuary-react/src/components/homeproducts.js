import React, { useState } from 'react'
import SearchBar from "./searchbar"
import Catalog from './catalog'
import ShopButton from './shopbutton'


export default function HomeProducts() {
    const [search, changeSearch] = useState("")

    // TODO: add price_low, price_high props

    return (
        <div className='products'>
            <SearchBar 
                search={search}
                changeSearch={changeSearch}
            />
            <h2>What's Hot</h2>
            <Catalog 
                search={search}
                size={0}
                price={0}
                site={""}
            />
            <ShopButton link="/shop">Shop All</ShopButton>
        </div>
    )
}