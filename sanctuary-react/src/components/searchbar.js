import React from 'react'
import {RiSearchLine} from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../redux/actions'


export default function SearchBar(props) {

    const dispatch = useDispatch()

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
                onChange={e => dispatch(updateFilter(e.target.value))}
            />
        </div>
    )
}