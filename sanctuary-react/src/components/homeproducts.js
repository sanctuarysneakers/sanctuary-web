import React, { useState } from 'react'
import SearchBar from "./searchbar"
import Catalog from './catalog'
import ShopButton from './shopbutton'


export default function HomeProducts() {
    const [search, changeSearch] = useState("")

    return (
        <div className='homeProducts'>
            <SearchBar 
                search={search}
                changeSearch={changeSearch}
            />
            <h2>What's Hot</h2>
            <Catalog search={search}/>
            <ShopButton link="/shop">Shop All</ShopButton>
        </div>
    )
}