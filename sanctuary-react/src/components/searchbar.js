import React from 'react'
import {RiSearchLine} from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { updateSearch } from '../redux/actions'


export default function SearchBar() {

    const dispatch = useDispatch()

    // TODO: make it become full screen when clicked in mobile version

    return (
        <div className="searchBar">
            <div className="searchIcon">
                <RiSearchLine/>
            </div>
            <input 
                className="searchText"
                type="text"
                placeholder="Search"
                onChange={e => dispatch(updateSearch(e.target.value))}
            />
        </div>
    )
}