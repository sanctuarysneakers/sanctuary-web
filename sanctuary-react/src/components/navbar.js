import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './searchbar'


export default function NavBar() {

    return (
        <nav className='navbar'>
            <div className='navbarContent'>
                <Link to={"/"}>
                    <span className="sanctuaryLogo">
                        Sanctuary
                    </span>
                </Link>
                <SearchBar/>
            </div>
        </nav>
    )
}