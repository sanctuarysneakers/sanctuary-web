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

    useEffect(() => {
        if (isDesktop) dispatch(collapseBar())
    })

    return (
        <React.Fragment>

            {/* Desktop Search Bar */}

            <div className="searchBar desktop">
                <div className="searchBarIcons">
                    <RiSearchLine />
                </div>
                <input
                    className="searchText"
                    type="text"
                    placeholder="Search"
                    onChange={e => dispatch(updateSearch(e.target.value))}
                />
            </div>

            {/* Mobile Search Bar */}

            <div className={`searchBar mobile ${!isCollapsed && "no-border"}`}>
                <div
                    className="searchBarIcons"
                    onClick={() => dispatch(expandBar())}
                >
                    <RiSearchLine />
                </div>

                {!isCollapsed &&
                    <input
                        className={'searchText mobileSearchText'}
                        type="text"
                        placeholder="Search"
                        onChange={e => dispatch(updateSearch(e.target.value))}
                    />}
            </div>

            {!isCollapsed &&
                <div
                    className={'searchBarIcons closeIcon mobile'}
                    onClick={() => dispatch(collapseBar())}
                >
                    <RiCloseLine />
                </div>}
        </React.Fragment>
    )
}