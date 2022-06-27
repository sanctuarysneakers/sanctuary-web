import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Catalog from './catalog'
import Footer from '../Other/footer'
import { useMediaQuery } from 'react-responsive'
import { showFilterModal, resetBrowseFilters } from '../../redux/actions'

import BrowseFilterDropdown from './Filters/browseFilterDropdown'
import BrowseFilterMultiCheckbox from './Filters/browseFilterMultiCheckbox'

import { showHomeSeach, updateBrowseSort, updateBrowseBrand, updateBrowseReleaseYears, updateBrowseSizeTypes, updateBrowsePriceRanges } from '../../redux/actions'
import { brandOptions, sortOptions, releaseYearOptions, priceOptions, sizeTypeOptions } from '../../assets/constants'

import BrowseFilterWrapper from './Filters/browseFilterWrapper'

export default function Browse() {

    const dispatch = useDispatch()
    const isDesktop = useMediaQuery({ query: '(min-width: 820px)' })

    let browseFilters = useSelector(state => state.browse.filters)

    let { searchTerm } = useParams()
    if (!searchTerm) searchTerm = ''

    dispatch(showHomeSeach())

    const handleFilter = () => {
        if (!isDesktop) {
            dispatch(showFilterModal())
        }
    }

    const hasFilters = () => {
        console.log(Object.values(browseFilters))
        return Object.values(browseFilters).some(x => x != null && x.length > 0) 
    }

    const onClearFilters = () => {
        dispatch(resetBrowseFilters()) 
    } 

    return (
        <div className='browse'>
            <Helmet>
                <title>Sanctuary: Browse</title>
            </Helmet>

            <div className="browse-header">
                <div className='browse-header-content'>

                    {!searchTerm && <div className='browse-header-text'>
                        <h2> Browse </h2>
                    </div>}
                    {searchTerm && <div className='browse-header-text'>
                        <h2> Search results for </h2>
                        <h2> '{searchTerm}' </h2>
                    </div>}
                </div>
            </div>

            <div className='browse-sort-by'>
                <h4 className='browse-filter-title' onClick={handleFilter}>
                    Filter
                </h4>
                <div className='browse-filter-dropdowns'>
                        {hasFilters() && 
                            <button onClick={onClearFilters}>
							    Clear Filters
						    </button>
                        }
                    <BrowseFilterDropdown options={sizeTypeOptions} placeholder="Size Type" updateAction={updateBrowseSizeTypes} />
                    <BrowseFilterDropdown options={brandOptions} placeholder="Brand" updateAction={updateBrowseBrand} />
                    <BrowseFilterDropdown options={sortOptions} placeholder="Sort By" updateAction={updateBrowseSort} />
                </div>
            </div>

            <div className="browse-body" >
                {isDesktop && <div className="browse-filters">
                    <BrowseFilterWrapper/> 
                    {/* <BrowseFilterMultiCheckbox options={priceOptions} title="Price Ranges" updateAction={updateBrowsePriceRanges} />
                    <BrowseFilterMultiCheckbox options={releaseYearOptions} title="Release Year" updateAction={updateBrowseReleaseYears} showMoreOption={true} /> */}
                </div>}

                <div className="browse-catalog">
                    <Catalog searchTerm={searchTerm} />
                </div>
            </div>
            <Footer colour={'blue'} />
        </div>
    )

}