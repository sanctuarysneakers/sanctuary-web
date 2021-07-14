import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useMediaQuery } from 'react-responsive'


export default function SearchBar() {

    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })
    const searchBarStyle = isDesktop ? "searchBar-desktop" : "searchBar-mobile"
    const searchTextStyle = isDesktop ? "searchText" : "mobileSearchText"

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            // redirect to browse page with search query as url param
            document.location.href = `/browse/${e.target.value}`
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