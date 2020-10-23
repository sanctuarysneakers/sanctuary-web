import React, { useEffect } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch, collapseBar, expandBar } from '../redux/actions'
import { useMediaQuery } from 'react-responsive'


export default function SearchBar() {

    const dispatch = useDispatch()
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })

    const SLEEP_TIME = 500
    let filterChangeTimer = null

    const handleChange = e => {
        const search = e.target.value

        clearTimeout(filterChangeTimer)
        filterChangeTimer = setTimeout(() => {
            dispatch(updateSearch(search))
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