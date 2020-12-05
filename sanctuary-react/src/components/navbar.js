import React, { useEffect, useState } from 'react'
import { showAboutModal } from '../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'
import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"


export default function NavBar() {

    const dispatch = useDispatch()
    const splashHeight = useSelector(state => state.splashHeight)
    const [isSearchBarVisible, setSearchBarVisibility] = useState(false)

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    // control Search bar visibility on depending on scroll height
    useEffect(() => {
        const onScroll = () => {
            setSearchBarVisibility(window.scrollY >= splashHeight)
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    });


    return (
        <nav className='navbar'>
            <div className='navbarContent'>
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
                {isSearchBarVisible && <SearchBar />}
                <button className='aboutUsBtn' onClick={() => dispatch(showAboutModal())}>
                    How It Works
                </button>
            </div >
        </nav >
    )
}