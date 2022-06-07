import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import Catalog from './catalog'
import Footer from '../Other/footer'

import BrowseFilterDropdown from './browseFilterDropdown'
import BrowseFilterMultiCheckbox from './browseFilterMultiCheckbox'

import { showHomeSeach, updateBrowseSort, updateBrowseBrand, updateBrowseReleaseYears, updateBrowseSizeTypes, updateBrowsePriceRanges } from '../../redux/actions'
import { brandOptions, sortOptions, releaseYearOptions, priceOptions, sizeTypeOptions } from '../../assets/constants'

export default function Browse() {

    const [isMobile, setIsMobile] = useState(false)

    const dispatch = useDispatch()

    let {searchTerm} = useParams()
    if (!searchTerm) searchTerm = ''

    dispatch(showHomeSeach())

    window.addEventListener("resize", function() {
        if (window.matchMedia("(max-width: 820px)").matches) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    })
    
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
                <h4 className='browse-filter-title'>
                    Filters
                </h4>
                {/* <BrowseFilterDropdown options={sizeTypeOptions} placeholder="Size Type" updateAction={updateBrowseSizeTypes}/>  */}
                {/* <BrowseFilterDropdown options={brandOptions} placeholder="Brand" updateAction={updateBrowseBrand}/> */}
                <BrowseFilterDropdown options={sortOptions} placeholder="Sort By" updateAction={updateBrowseSort}/>
            </div>
     
            <div className="browse-body" >
                {!isMobile && <div className="browse-filters">
                    <BrowseFilterMultiCheckbox options={brandOptions} title='Brand' updateAction={updateBrowseBrand} showMoreOption={true} />
                    <BrowseFilterMultiCheckbox options={sizeTypeOptions} title='Size Type' updateAction={updateBrowseSizeTypes} showMoreOption={false} />
                    <BrowseFilterMultiCheckbox options={priceOptions} title="Price Ranges" updateAction={updateBrowsePriceRanges} showMoreOption={false}/> 
                    <BrowseFilterMultiCheckbox options={releaseYearOptions} title="Release Year" updateAction={updateBrowseReleaseYears} showMoreOption={true}/>             
                </div>}

                <div className="browse-catalog">
                    <Catalog searchTerm={searchTerm} />
                </div>
            </div>
            <Footer colour={'blue'} />
        </div>
    )

}