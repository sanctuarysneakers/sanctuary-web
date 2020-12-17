import React, { useEffect, useState } from 'react'
import { collapseBar, showAboutModal } from '../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'
import CollapsibleSearchBar from './searchbarcollapsible'
import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"
import { useMediaQuery } from 'react-responsive'
import { GrCircleInformation } from "react-icons/gr";



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

    // Ensures the nav bar layout is not in collapsed mode when switching to desktop view
    useEffect(() => {
        if (isDesktop) dispatch(collapseBar())
    }, [isDesktop])

    return (
        <nav className='navbar'>

            {/* Web Version */}
            <div className='navbarContent-web'>

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

                    <div className="nav-searchBar-web">
                        {isSearchBarVisible && isDesktop && <SearchBar />}
                    </div>

                    <Link to="/" className='navlinks'>
                        Catalog
                    </Link>

                    {isCollapsed &&
                        <button className='navlinks' onClick={() => dispatch(showAboutModal())}>
                            How It Works
                        </button>
                    }
                    
                    <Link to="/login" className='navlinks'>
                        Login
                    </Link>

                    <Link to="/signup" className='navlinks'>
                        Sign Up
                    </Link>

                </div>
            </div >

            {/* Mobile Version */}
            <div className='navbarContent-mobile'>

                    {isCollapsed &&
                        <button className='navlinks' onClick={() => dispatch(showAboutModal())}>
                            <GrCircleInformation />
                        </button>
                    }

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

                    <div className='nav-searchBar-mobile'>
                        {isSearchBarVisible && !isDesktop && <CollapsibleSearchBar />}
                    </div>

            </div>
        </nav >
    )
}