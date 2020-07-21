import React, { useState } from 'react'


export default function SearchBar() {

    const [search, changeSearch] = useState()

    function updateSearch(event) {
        changeSearch(event.target.value)
    }

    return (
        <input 
            className='searchBar'
            type='text' 
            value={search}
            onChange={updateSearch}
        />
    )
}