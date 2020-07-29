import React, { useState } from 'react'
import Catalog from './catalog'
import ShopButton from './shopbutton'
import FilterBar from './filterbar'
import SearchBar from './searchbar'

export default function ShopProducts() {
    const [search, changeSearch] = useState("")
    const [sizeFilter, changeSizeFilter] = useState(0)
    const [priceFilter, changePriceFilter] = useState(0)
    const [siteFilter, changeSiteFilter] = useState("")

    return (
        <div className="products">
            <SearchBar
                search={search}
                changeSearch={changeSearch}
            />
            <h2>Results 237</h2>
            <FilterBar 
                sizeFilter={sizeFilter}
                changeSizeFilter={changeSizeFilter}
                priceFilter={priceFilter}
                changePriceFilter={changePriceFilter}
                siteFilter={siteFilter}
                changeSiteFilter={changeSiteFilter}
            />
            <Catalog 
                search={search}
                sizeFilter={sizeFilter}
                priceFilter={priceFilter}
                siteFilter={siteFilter}
            />
            <ShopButton link="/shop">Load More</ShopButton>
        </div>
    )
}