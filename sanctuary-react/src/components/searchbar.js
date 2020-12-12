import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { updateSearch } from '../redux/actions'


export default function SearchBar() {

    const dispatch = useDispatch()
    const search = useSelector(state => state.filter.search)
    const splashHeight = useSelector(state => state.splashHeight)
    const isDesktop = useMediaQuery({ query: '(min-width: 930px)' })

    const scrollToCatalog = () => {
        if (window.scrollY < splashHeight) {
            window.scrollTo(0, splashHeight)
        }
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') scrollToCatalog()
    }

    const searchBarStyle = isDesktop ? "searchBar-desktop" : "searchBar-mobile"
    const searchTextStyle = isDesktop ? "searchText" : "mobileSearchText"

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
                    onChange={e => dispatch(updateSearch(e.target.value))}
                    onKeyDown={e => handleKeyDown(e)}
                    value={search}
                />
            </div>

        </React.Fragment>
    )
}