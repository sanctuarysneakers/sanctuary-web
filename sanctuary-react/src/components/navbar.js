import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from './searchbar'


export default function NavBar() {

    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)

    return (
        <nav className='navbar'>
            <div className='navbarContent'>
                {isCollapsed &&
                    <Link to={"/"}>
                    <span className="sanctuaryLogo">
                        Sanctuary
                    </span>
                </Link>}
                <SearchBar/>
            </div>
        </nav>
    )
}