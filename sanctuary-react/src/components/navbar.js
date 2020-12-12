import React, { useEffect, useState } from 'react'
import { showAboutModal } from '../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'
import CollapsibleSearchBar from './searchbarcollapsible'
import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"
import { useMediaQuery } from 'react-responsive'



export default function NavBar() {

    const dispatch = useDispatch()
    const splashHeight = useSelector(state => state.splashHeight)
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })
    const [isSearchBarVisible, setSearchBarVisibility] = useState(false)

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    // control Search bar visibility depending on scroll height
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

                <div className='content-right'>

                    <div className="nav-searchBar">
                        {isSearchBarVisible && isDesktop && <SearchBar />}
                        {isSearchBarVisible && !isDesktop && <CollapsibleSearchBar />}
                    </div>

                    {isCollapsed &&
                        <button className='howItWorks' onClick={() => dispatch(showAboutModal())}>
                            How It Works
                        </button>
                    }

                </div>
            </div >
        </nav >
    )
}