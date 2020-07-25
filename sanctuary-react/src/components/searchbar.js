import React from 'react'


export default function SearchBar(props) {

    function updateSearch(event) {
        props.changeSearch(event.target.value)
    }

    return (
        <input 
            className='searchBar'
            type='text' 
            value={props.search}
            onChange={updateSearch}
        />
    )
}