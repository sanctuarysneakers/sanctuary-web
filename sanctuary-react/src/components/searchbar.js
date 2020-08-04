import React from 'react'
import {RiSearchLine} from 'react-icons/ri'


export default function SearchBar(props) {

    function updateSearch(event) {
        props.changeSearch(event.target.value)
    }

    return (
        <div className="searchBar">
            <div className="searchIcon">
                <RiSearchLine/>
            </div>
            <input 
                className="searchText"
                type="text"
                placeholder="Search"
                value={props.search}
                onChange={updateSearch}
            />
        </div>
    )
}