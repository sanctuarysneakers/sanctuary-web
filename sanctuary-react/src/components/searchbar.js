import React, { useState } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch, collapseBar, expandBar } from '../redux/actions'


export default function SearchBar() {

    const dispatch = useDispatch()
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)

    return (
        <React.Fragment>
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