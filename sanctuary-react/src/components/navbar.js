import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from './searchbar'

import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"

export default function NavBar() {

    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)

    return (
        <nav className='navbar'>
            <div className='navbarContent'>
                {isCollapsed &&
                    <Link to={"/"}>
                        <img
                            className='sanctuaryLogo'
                            src={sanctuaryLogo}
                            alt={"Sanctuary"}
                        />
                    </Link>}
                <SearchBar />
            </div>
        </nav>
    )
}