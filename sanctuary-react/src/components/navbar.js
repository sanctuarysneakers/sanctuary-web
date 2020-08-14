import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './searchbar'


export default function NavBar() {

    return (
        <div className='navbar'>
            <Link to={"/"}>
                <span className="sanctuaryLogo">
                    Sanctuary
                </span>
            </Link>
            <SearchBar/>
        </div>
    )
}