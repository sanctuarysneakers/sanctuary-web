import React, { useEffect, useState } from 'react'
import { collapseBar, showAboutModal, showHamburgerModal } from '../redux/actions'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'
import CollapsibleSearchBar from './searchbarcollapsible'
import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"
import { useMediaQuery } from 'react-responsive'
import firebase from '../services/firebase.js'

import HamburgerIcon from '../assets/images/icons/hamburgerIcon'
import FilterIcon from '../assets/images/icons/filterIcon'
import ProfileIcon from '../assets/images/icons/profileIcon'



export default function NavBar() {

    const dispatch = useDispatch()
    const splashHeight = useSelector(state => state.splashHeight)
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
    const uuid = useSelector(state => state.uuid)
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })
    const [isSearchBarVisible, setSearchBarVisibility] = useState(false)
    const history = useHistory()
    const user = firebase.auth().currentUser

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

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                history.push("/")
                window.scrollTo(0, 0)
            })
    }

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

                        <Link to="blog">
                            Blog
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

                        {user && <a onClick={signOut}> Sign Out </a>}

                        {user && <div className='navbar-desktop-profile'>

                            {user.photoURL !== null &&
                                <img className='navbar-desktop-profile-picture'
                                    src={user.photoURL}
                                    alt="desktop-profile-picture"
                                />
                            }

                            {user.photoURL === null && <ProfileIcon />} </div>
                        }

                    </div>
                </div>
            </div>


            // <nav className='navbar'>

            //     {/* Web Version */}
            //     <div className='navbarContent-web'>

            //         {isCollapsed &&
            //             <Link
            //                 to={"/"}
            //                 onClick={handleClick}
            //             >
            //                 <img
            //                     className='sanctuaryLogo'
            //                     src={sanctuaryLogo}
            //                     alt={"Sanctuary"}
            //                 />
            //             </Link>
            //         }

            //         <div className='content-right'>

            //             <div className="nav-searchBar-web">
            //                 {isSearchBarVisible && isDesktop && <SearchBar />}
            //             </div>

            //             <Link to="/" className='navlinks'>
            //                 Catalog
            //             </Link>

            //             {isCollapsed &&
            //                 <button className='navlinks' onClick={() => dispatch(showAboutModal())}>
            //                     How It Works
            //                 </button>
            //             }

            //             {!uuid && <React.Fragment>
            //                 <Link to="/login" className='navlinks'>
            //                     Login
            //                 </Link>

            //                 <Link to="/signup" className='navlinks'>
            //                     Sign Up
            //                 </Link>
            //                 {/* <button onClick={() => dispatch(showFilterModal())}> filters </button> */}
            //             </React.Fragment>}

            //             {uuid && <React.Fragment>
            //                 <Link to="/profile" className='navlinks'>
            //                     <GiAmmonite />
            //                 </Link>

            //                 <button onClick={signOut}> Sign out </button>
            //             </React.Fragment>}

            //         </div>
            //     </div >

            //     {/* Mobile Version */}
            //     <div className='navbarContent-mobile'>

            //         {isCollapsed &&
            //             <button className='navlinks' onClick={() => dispatch(showAboutModal())}>
            //                 <GrCircleInformation />
            //             </button>
            //         }

            //         {isCollapsed &&
            //             <Link
            //                 to={"/"}
            //                 onClick={handleClick}
            //             >
            //                 <img
            //                     className='sanctuaryLogo'
            //                     src={sanctuaryLogo}
            //                     alt={"Sanctuary"}
            //                 />
            //             </Link>
            //         }

            //         <div className='nav-searchBar-mobile'>
            //             {!isDesktop && <CollapsibleSearchBar />}
            //         </div>

            //     </div>
            // </nav >

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
                        {isCollapsed && <FilterIcon />}

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
