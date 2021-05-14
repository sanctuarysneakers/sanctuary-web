import React, { useEffect, useState } from 'react'
import { collapseBar, showAboutModal, showHamburgerModal, updateCurrency } from '../redux/actions'
import { Link, useHistory } from 'react-router-dom'
import { Link as Scroll } from 'react-scroll'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'
import CollapsibleSearchBar from './searchbarcollapsible'
import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"
import { useMediaQuery } from 'react-responsive'
import Select from 'react-select'

import HamburgerIcon from '../assets/images/icons/hamburgerIcon'
import FilterIcon from '../assets/images/icons/filterIcon'
import ProfileIcon from '../assets/images/icons/profileIcon'

export default function NavBar() {

    const dispatch = useDispatch()
    const homeSearchVisible = useSelector(state => state.homeSearchVisible)
    const splashHeight = useSelector(state => state.splashHeight)
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
    const uuid = useSelector(state => state.uuid)
    const isDesktop = useMediaQuery({ query: '(min-width: 1120px)' })    // It was 930 before
    const [isSearchBarVisible, setSearchBarVisibility] = useState(false)
    const history = useHistory()
    // const user = firebase.auth().currentUser
    const user = useSelector(state => state.user)
    const currency = useSelector(state => state.currency);

    const currencyOptions = [
        { label: '$ CAD', value: 'CAD' },
        { label: '€ EUR', value: 'EUR' },
        { label: '£ GBP', value: 'GBP' },
        { label: '¥ JPY', value: 'JPY' },
        { label: '$ USD', value: 'USD' }
    ];
    const handleCurrencyChange = (e) => {
        const newCurrency = e.value;
        dispatch(updateCurrency(newCurrency));
    }

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    // control Search bar visibility depending on scroll height
    useEffect(() => {
        if (homeSearchVisible) {
            
            const onScroll = () => {
                setSearchBarVisibility(window.scrollY >= splashHeight)
            };
            window.addEventListener("scroll", onScroll);

            return () => window.removeEventListener("scroll", onScroll);
        }
    });

    // Ensures the nav bar layout is not in collapsed mode when switching to desktop view
    useEffect(() => {
        if (isDesktop) 
            dispatch(collapseBar())
    }, [isDesktop])

    if (isDesktop) {
        return (
            <div className='navbar-desktop'>

                <div className='navbar-desktop-content'>

                    <Link to="/" onClick={handleClick}>
                        <img className='sanctuary-logo-desktop' src={sanctuaryLogo} alt={"Sanctuary"} />
                    </Link>

                    <div className='navbar-desktop-links'>
                        {isSearchBarVisible && <div className='navbar-desktop-searchbar'>
                            <SearchBar />
                        </div>}
                         
                        <Select
                            className='currencyFilter'
                            value={currencyOptions.find(obj => obj.value === currency)} // Default currency is USD
                            options={currencyOptions} 
                            onChange={handleCurrencyChange}
                        />

                        <Link to="blog">
                            Newsroom
                        </Link>

                        <a onClick={() => dispatch(showAboutModal())}> 
                            How it Works 
                        </a>

                        {!user && <Link to="sign-in">
                            Sign In
                        </Link>}

                        {!user && <Link to="create-account" className='navbar-desktop-create-account'>
                            Create Account
                        </Link>}

                        {user && 
                            <Link className='navbar-desktop-profile-container' to="/profile">
                                <div className='navbar-desktop-profile'>

                                    {user.photoURL !== null &&
                                        <img className='navbar-desktop-profile-picture'
                                            src={user.photoURL}
                                            alt="desktop-profile-picture"
                                        />
                                    }

                                    {user.photoURL === null && <ProfileIcon />} 
                                </div>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='navbar-mobile'>
                <div className='navbar-mobile-content'>

                    {isCollapsed &&
                        <Link to={"/"} onClick={handleClick}>
                            <img className='sanctuary-logo' src={sanctuaryLogo} />
                        </Link>}

                    <div className='icons'>
                        {!isDesktop && <CollapsibleSearchBar />}
                        {isCollapsed && 

                            <Scroll
                                activeClass="active"
                                to="section-a"
                                spy={true}
                                smooth={true}
                                offset={-61}    // 61 is the current height of mobile navbar
                                duration={600}
                            >
                                <FilterIcon />
                            </Scroll>}

                        {isCollapsed && !user &&
                            <button className='hamburger-button' onClick={() => dispatch(showHamburgerModal())}>
                                <HamburgerIcon />
                            </button>
                        }

                        {isCollapsed && user &&
                            <button className='profile-button' onClick={() => dispatch(showHamburgerModal())}>

                                {user.photoURL !== null &&
                                    <img className='profilePicture' src={user.photoURL} alt='profile-picture' />
                                }

                                {user.photoURL === null && <ProfileIcon />}

                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
