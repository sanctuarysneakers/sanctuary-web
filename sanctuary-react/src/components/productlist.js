import React from 'react'
import mock_data from '../assets/mock-data'
import Sneaker from './sneaker'
import SearchBar from "./searchbar"

const sneakers = mock_data

export default function ProductList() {
    return (
        <div className='productList'>
            <SearchBar/>
            <h2>What's Hot</h2>
            <div className='products'>
                {sneakers.map((sneaker, index) => {
                     return (
                     <Sneaker
                        key={sneaker.id}
                        brand={sneaker.brand}
                        size={sneaker.size}
                        price={sneaker.price}
                        url={sneaker.url}
                        model={sneaker.model}
                        source_site={sneaker.source_site}
                        img={sneaker.img}
                    />
                    )})}
            </div>
        </div>
    )
}