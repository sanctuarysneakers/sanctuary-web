import React, { useEffect, useState } from 'react'
import { collapseBar, showAboutModal, updateCurrency } from '../redux/actions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './searchbar'
import CollapsibleSearchBar from './searchbarcollapsible'
import sanctuaryLogo from "../assets/images/sanctuary-logo-row.png"
import { useMediaQuery } from 'react-responsive'
import { GrCircleInformation } from "react-icons/gr";
import Select from 'react-select'


export default function NavBar() {

    const dispatch = useDispatch();
    const splashHeight = useSelector(state => state.splashHeight);
    const isSearchBarCollapsed = useSelector(state => state.isSearchBarCollapsed);
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' });
    const [isSearchBarVisible, setSearchBarVisibility] = useState(false);
    const currency = useSelector(state => state.currency);

    const currencyOptions = [
        { label: '$ AUD', value: 'AUD' },
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

    const handleLogoClick = () => {
        window.scrollTo(0, 0)
    }

    // control Search bar visibility depending on scroll height
    useEffect(() => {
        const onScroll = () => {
            setSearchBarVisibility(window.scrollY >= splashHeight)
        }
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    });

    // Ensures the nav bar layout is not in collapsed mode when switching to desktop view
    useEffect(() => {
        if (isDesktop) 
            dispatch(collapseBar())
    }, [isDesktop])


    return (
        <nav className='navbar'>

            {/* Desktop Version */}
            <div className='navbarContent-web'>

                {isSearchBarCollapsed &&
                    <Link
                        to={"/"}
                        onClick={handleLogoClick}
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

                    {isSearchBarCollapsed && !isSearchBarVisible &&
                        <Select
                            className='currencyFilter'
                            value={currencyOptions.find(obj => obj.value === currency)} // Default currency is USD
                            options={currencyOptions} 
                            onChange={handleCurrencyChange}
                        />
                    }

                    {isSearchBarCollapsed &&
                        <button className='howItWorks' onClick={() => dispatch(showAboutModal())}>
                            How It Works
                        </button>
                    }

                </div>
            </div >

            {/* Mobile Version */}
            <div className='navbarContent-mobile'>

                    {isSearchBarCollapsed &&
                        <button className='howItWorks' onClick={() => dispatch(showAboutModal())}>
                            <GrCircleInformation />
                        </button>
                    }

                    {isSearchBarCollapsed &&
                        <Link
                            to={"/"}
                            onClick={handleLogoClick}
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
    );

}