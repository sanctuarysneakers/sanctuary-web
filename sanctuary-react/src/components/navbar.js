import React from 'react'
import { showAboutModal } from '../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'

import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"

export default function NavBar() {

    const dispatch = useDispatch()
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
    const searchBarVisible = useSelector(state => state.searchBarVisible)

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    return (
        <nav className='navbar'>
            <div className='navbarContent'>
                {isCollapsed &&
                    <Link
                        to={"/"}
                        onClick={handleClick}
                    >
                        <img
                            className='sanctuaryLogo'
                            src={sanctuaryLogo}
                            alt={"Sanctuary"}
                        />
                    </Link>
                }
                {searchBarVisible && <SearchBar />}
                <button className='howItWorks' onClick={() => dispatch(showAboutModal())}>
                    How It Works
                </button>
            </div >
        </nav >
    )
}