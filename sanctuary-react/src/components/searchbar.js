import React, { useEffect } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch, collapseBar, expandBar } from '../redux/actions'
import { useMediaQuery } from 'react-responsive'


export default function SearchBar() {

    const dispatch = useDispatch()
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)

    // Refs for reseting slide position on new search
    const stockxSwiperRef = useSelector(state => state.refs.stockxSwiperRef)
    const goatSwiperRef = useSelector(state => state.refs.goatSwiperRef)
    const grailedSwiperRef = useSelector(state => state.refs.grailedSwiperRef)
    const flightClubSwiperRef = useSelector(state => state.refs.flightClubSwiperRef)

    // Scroll on press enter in search bar mechanics
    const catalogRef = useSelector(state => state.refs.catalogRef)
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })

    const scrollToRef = (ref) => {
        const location = isDesktop ? ref.current.offsetTop - 91 : ref.current.offsetTop - 61
        // Only scroll if the window is above the start of the catalog
        if (window.scrollY < location) {
            window.scrollTo(0, location)
        }
    }

    const setSlidersToFirstSlide = (ref) => {
        ref.current.swiper.slideTo(0)
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            scrollToRef(catalogRef)
            setSlidersToFirstSlide(stockxSwiperRef)
            setSlidersToFirstSlide(goatSwiperRef)
            setSlidersToFirstSlide(grailedSwiperRef)
            setSlidersToFirstSlide(flightClubSwiperRef)
        }
    }

    // Wait until user doesn't type for half a second to update catalog
    const SLEEP_TIME = 500
    let filterChangeTimer = null

    const handleChange = e => {
        const value = e.target.value

        clearTimeout(filterChangeTimer)
        filterChangeTimer = setTimeout(() => {
            dispatch(updateSearch(value))
        }, SLEEP_TIME)
    }

    useEffect(() => {
        if (isDesktop) dispatch(collapseBar())
    })

    return (
        <React.Fragment>

            {/* Desktop Search Bar */}

            <div className="searchBar-desktop">
                <div className="searchIcon">
                    <RiSearchLine/>
                </div>
                <input
                    className="searchText"
                    type="text"
                    placeholder="Search"
                    onChange={e => handleChange(e)}
                    onKeyPress={handleKeyPress}
                />
            </div>

            {/* Mobile Search Bar */}

            <div className={`searchBar-mobile ${!isCollapsed && "no-border"}`}>
                <div
                    className="searchIcon"
                    onClick={() => dispatch(expandBar())}
                >
                    <RiSearchLine />
                </div>

                {!isCollapsed &&
                    <input
                        className={'mobileSearchText'}
                        type="text"
                        placeholder="Search"
                        onChange={e => handleChange(e)}
                        onKeyPress={handleKeyPress}
                    />}
            </div>

            {!isCollapsed &&
                <div
                    className={'closeIcon-mobile'}
                    onClick={() => dispatch(collapseBar())}
                >
                    <RiCloseLine />
                </div>}

        </React.Fragment>
    )
}