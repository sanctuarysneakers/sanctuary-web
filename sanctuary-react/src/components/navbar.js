import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from './searchbar'

import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"

export default function NavBar() {

    const isCollapsed = useSelector(state => state.isSearchBarCollapsed);

    return (
        <nav className='navbar'>
            <div className='navbarContent'>
                {isCollapsed &&
                    <Link to={"/"}>
                        <a href="#" onClick={() => window.location.reload()}>
                        <a href="#" onClick={() => window.scrollTo(0, 0)}>
                        <img
                            className='sanctuaryLogo'
                            src={sanctuaryLogo}
                            alt={"Sanctuary"}
                        />
                        </a>
                        </a>
                    </Link>}
                <SearchBar />
            </div>
        </nav>
    )
}