import React from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { collapseBar, expandBar, updateSearch } from '../redux/actions'


export default function CollapsibleSearchBar() {

    const dispatch = useDispatch()
    const search = useSelector(state => state.filter.search)
    const isCollapsed = useSelector(state => state.isSearchBarCollapsed)

    const searchBarStyle = isCollapsed ? 'searchBar-collapsed' : 'searchBar-expanded'

    return (
        <React.Fragment>

            <div className={`${searchBarStyle}`}>

                <div
                    className="searchIcon"
                    onClick={() => dispatch(expandBar())}
                >
                    <RiSearchLine />
                </div>

                {!isCollapsed &&
                    <input
                        className='mobileSearchText'
                        type="text"
                        placeholder="Search"
                        onChange={e => dispatch(updateSearch(e.target.value))}
                        value={search}
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