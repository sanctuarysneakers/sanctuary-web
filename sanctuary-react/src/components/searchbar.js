import React, { useEffect } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch, collapseBar, expandBar } from '../redux/actions'


export default function SearchBar() {

    // the amount of ms that must pass before 
    //the user has considered to have stopped typing.
    const SLEEP_TIME = 500

    const dispatch = useDispatch()
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)

    let typingTimer = null;

    useEffect(() => {
        return () => clearTimeout(typingTimer)
    }, [])

    const handleChange = e => {
        const val = e.target.value
        clearTimeout(typingTimer)
        typingTimer = setTimeout(() => dispatch(updateSearch(val)), SLEEP_TIME)
    }


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
                    onChange={handleChange}
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
                        onChange={handleChange}
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