import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch } from '../redux/actions'


export default function SearchBar() {

    const dispatch = useDispatch()
    const search = useSelector(state => state.filter.search)
    const splashHeight = useSelector(state => state.splashHeight)

    const scrollToCatalog = () => {
        if (window.scrollY < splashHeight) {
            window.scrollTo(0, splashHeight)
        }
    }

    const handleChange = e => {
        dispatch(updateSearch(e.target.value))
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') scrollToCatalog()
    }

    return (
        <React.Fragment>

            {/* Desktop Search Bar */}

            <div className="searchBar-desktop">
                <div className="searchIcon">
                    <RiSearchLine />
                </div>
                <input
                    className="searchText"
                    type="text"
                    placeholder="Search"
                    onChange={e => handleChange(e)}
                    onKeyDown={e => handleKeyDown(e)}
                    value={search}
                />
            </div>

            {/* Mobile Search Bar */}

            <div className='searchBar-mobile'>
                <div className="searchIcon">
                    <RiSearchLine />
                </div>
                <input
                    className='mobileSearchText'
                    type="text"
                    placeholder="Search"
                    onChange={e => handleChange(e)}
                    onKeyDown={e => handleKeyDown(e)}
                    value={search}
                />
            </div>
        </React.Fragment>
    )
}