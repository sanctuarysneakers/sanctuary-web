import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router'


export default function SearchBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })
    const searchBarStyle = isDesktop ? "searchBar-desktop" : "searchBar-mobile"
    const searchTextStyle = isDesktop ? "searchText" : "mobileSearchText"

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            history.push(`/browse/${e.target.value}`)  // redirect to browse page
            history.go(0)  // refresh page with new query
        }
    }

    return (
        <React.Fragment>
            <div className={searchBarStyle}>
                <div className="searchIcon">
                    <RiSearchLine />
                </div>
                <input
                    className={searchTextStyle}
                    type="text"
                    placeholder="Search"
                    onKeyDown={e => handleKeyDown(e)}
                />
            </div>
        </React.Fragment>
    )
}