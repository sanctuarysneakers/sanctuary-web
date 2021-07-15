import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,  useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { showSearchModal, showHamburgerModal } from '../redux/actions'
import ProfileIcon from '../assets/images/icons/profileIcon'
import {ReactComponent as SanctuaryLogo} from '../assets/images/SanctuaryLogo.svg'
import {ReactComponent as Search} from '../assets/images/Search.svg'
import {ReactComponent as Hamburger} from '../assets/images/Hamburger.svg'

export default function Navbar() {

    const [navbar, setNavbar] = useState(false)
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

    const setDropShadow = () => {
        if (window.scrollY >= 5) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', setDropShadow)

    return (
        <nav className={navbar ? 'navbar active' : 'navbar'}>
            <div className='navbar-content'>
                {isDesktop && <div className='desktop-content'>

                    <Link className='sanctuary-logo'
                        onClick={() => document.location.href = '/'}>
                        <SanctuaryLogo />
                    </Link>

                    <div className='navbar-links'>
                        <Search onClick={() => dispatch(showSearchModal())} />

                        <Link onClick={() => document.location.href = '/browse'}>
                            Browse
                        </Link>

                        <Link onClick={() => document.location.href = '/newsroom'}>
                            Newsroom
                        </Link>

                        {!user && <Link onClick={() => document.location.href = '/sign-in'}>
                            Sign In
                        </Link>}

                        {!user && <Link className='create-account'
                            onClick={() => document.location.href = '/create-account'}>
                            Create Account
                        </Link>}

                        {user && 
                            <Link className='navbar-profile'
                                onClick={() => {document.location.href = '/profile'}}>

                                <div className='navbar-profile-content'>
                                    {user.photoURL !== null &&
                                        <img className='navbar-profile-picture'
                                            src={user.photoURL}
                                            alt="desktop-profile-picture"
                                        />
                                    }

                                    {user.photoURL === null && <ProfileIcon />} 
                                </div>
                            </Link>
                        }
                    </div>
                </div>}

                {!isDesktop && <div className='mobile-content'>
                    <div className='hamburger-icon' onClick={() => dispatch(showHamburgerModal())}>
                        <Hamburger />
                    </div>

                    <Link className='sanctuary-logo'
                        onClick={() => document.location.href = '/'}>
                        <SanctuaryLogo />
                    </Link>

                    <Search onClick={() => dispatch(showSearchModal())} />
                </div>}
            </div>
        </nav>
    )
}











// import React, { useEffect } from 'react'
// import { collapseBar, showAboutModal, showHamburgerModal, updateCurrency } from '../redux/actions'
// import { Link } from 'react-router-dom'
// import { Link as Scroll } from 'react-scroll'
// import { useDispatch, useSelector } from 'react-redux'
// import SearchBar from './searchbar'
// import CollapsibleSearchBar from './searchbarcollapsible'
// import sanctuaryLogo from '../assets/images/sanctuary-logo-row.png'
// import { useMediaQuery } from 'react-responsive'
// import Select from 'react-select'

// import {ReactComponent as SanctuaryLogo} from '../assets/images/SanctuaryLogo.svg'

// import HamburgerIcon from '../assets/images/icons/hamburgerIcon'
// import FilterIcon from '../assets/images/icons/filterIcon'
// import ProfileIcon from '../assets/images/icons/profileIcon'


// export default function NavBar() {

//     const dispatch = useDispatch()
//     const searchBarVisible = useSelector(state => state.searchBarVisible)
//     const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
//     const isDesktop = useMediaQuery({ query: '(min-width: 1120px)' })
//     const user = useSelector(state => state.user)
//     const currency = useSelector(state => state.currency)

//     const currencyOptions = [
//         { label: '$ CAD', value: 'CAD' },
//         { label: '€ EUR', value: 'EUR' },
//         { label: '£ GBP', value: 'GBP' },
//         { label: '¥ JPY', value: 'JPY' },
//         { label: '$ USD', value: 'USD' }
//     ]

//     const handleCurrencyChange = (e) => {
//         const newCurrency = e.value
//         dispatch(updateCurrency(newCurrency))
//     }

//     // Ensure nav bar layout is not in collapsed mode when switching to desktop view
//     useEffect(() => {
//         if (isDesktop) 
//             dispatch(collapseBar())
//     }, [isDesktop])

//     if (isDesktop) {
//         return (
//             <div className='navbar-desktop'>
//                 <div className='navbar-desktop-content'>

//                     {/* <Link onClick={() => {document.location.href = '/'}}>
//                         <img className='sanctuary-logo-desktop' src={sanctuaryLogo} alt={"Sanctuary"} />
//                     </Link> */}

//                     <SanctuaryLogo />

//                     <div className='navbar-desktop-links'>
//                         {searchBarVisible && <div className='navbar-desktop-searchbar'>
//                             {/* <SearchBar /> */}
//                         </div>}
                         
//                         <Select
//                             className='currencyFilter'
//                             value={currencyOptions.find(obj => obj.value === currency)} // Default currency is USD
//                             options={currencyOptions} 
//                             onChange={handleCurrencyChange}
//                         />

//                         <Link onClick={() => {document.location.href = '/browse'}}>
//                             Browse
//                         </Link>

//                         <Link onClick={() => {document.location.href = '/blog'}}>
//                             Newsroom
//                         </Link>

//                         <a onClick={() => dispatch(showAboutModal())}> 
//                             About
//                         </a>

//                         {!user &&
//                             <Link onClick={() => {document.location.href = '/sign-in'}}>
//                                 Sign In
//                             </Link>
//                         }

//                         {!user &&
//                             <Link className='navbar-desktop-create-account'
//                                 onClick={() => {document.location.href = '/create-account'}}>
//                                 Sign Up
//                             </Link>
//                         }

//                         {user && 
//                             <Link className='navbar-desktop-profile-container'
//                                 onClick={() => {document.location.href = '/profile'}}>
//                                 <div className='navbar-desktop-profile'>
//                                     {user.photoURL !== null &&
//                                         <img className='navbar-desktop-profile-picture'
//                                             src={user.photoURL}
//                                             alt="desktop-profile-picture"
//                                         />
//                                     }
//                                     {user.photoURL === null && <ProfileIcon />} 
//                                 </div>
//                             </Link>
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     else {
//         return (
//             <div className='navbar-mobile'>
//                 <div className='navbar-mobile-content'>

//                     {isCollapsed &&
//                         <Link onClick={() => {document.location.href = '/'}}>
//                             <img className='sanctuary-logo' src={sanctuaryLogo} />
//                         </Link>}

//                     <div className='icons'>
//                         {!isDesktop && <CollapsibleSearchBar />}
//                         {isCollapsed && 

//                             <Scroll
//                                 activeClass="active"
//                                 to="section-a"
//                                 spy={true}
//                                 smooth={true}
//                                 offset={-61}    // 61 is the current height of mobile navbar
//                                 duration={600}
//                             >
//                                 <FilterIcon />
//                             </Scroll>}

//                         {isCollapsed && !user &&
//                             <button className='hamburger-button' onClick={() => dispatch(showHamburgerModal())}>
//                                 <HamburgerIcon />
//                             </button>
//                         }

//                         {isCollapsed && user &&
//                             <button className='profile-button' onClick={() => dispatch(showHamburgerModal())}>

//                                 {user.photoURL !== null &&
//                                     <img className='profilePicture' src={user.photoURL} alt='profile-picture' />
//                                 }

//                                 {user.photoURL === null && <ProfileIcon />}

//                             </button>
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
