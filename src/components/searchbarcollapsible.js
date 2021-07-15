import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import SearchIcon from '../assets/images/icons/searchIcon'
import { useDispatch, useSelector } from 'react-redux'
import { collapseBar, expandBar } from '../redux/actions'


export default function CollapsibleSearchBar() {

    const dispatch = useDispatch()

    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)
    const searchBarStyle = isCollapsed ? 'searchBar-collapsed' : 'searchBar-expanded'

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            // redirect to browse page with search query as url param
            document.location.href = `/browse/${e.target.value}`
        }
    }

    return (
        <React.Fragment>
            <div className={`${searchBarStyle}`}>
                <div
                    className="searchIcon"
                    onClick={() => dispatch(expandBar())}
                >
                    {isCollapsed && <SearchIcon />}
                    {!isCollapsed && <RiSearchLine />}
                </div>

                {!isCollapsed &&
                    <input
                        className='mobileSearchText'
                        type="text"
                        placeholder="Search"
                        onKeyDown={e => handleKeyDown(e)}
                    />
                }
            </div>

            {!isCollapsed &&
                <div
                    className={'cancelIcon-mobile'}
                    onClick={() => dispatch(collapseBar())}
                >
                    <p>Cancel</p>
                </div>
            }
        </React.Fragment>
    )
}