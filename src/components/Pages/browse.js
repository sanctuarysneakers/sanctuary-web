import React from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import Catalog from '../catalog'
import Footer from '../footer'
import BrowseFilterDropdown from '../browseFilterDropdown'
import BrowseFilterMultiCheckbox from '../browseFilterMultiCheckbox'
import { showHomeSeach, updateBrowseSort, updateBrowseBrand, updateBrowseReleaseYears, updateBrowseSizeTypes, updateBrowsePriceRanges } from '../../redux/actions'
import { brandOptions, sortOptions, releaseYearOptions, priceOptions, sizeTypeOptions } from '../../assets/constants'

export default function Browse() {

    const dispatch = useDispatch()

    let {searchTerm} = useParams()
    if (!searchTerm) searchTerm = ''

    console.log('search term is: ' + searchTerm)

    dispatch(showHomeSeach())

    return (
        <div className='browse'>
            <Helmet>
                <title>Sanctuary: Browse</title>
            </Helmet>
            <div className='browse-results'>
                <div className='browse-results-content'>

                    {!searchTerm && <div className='browse-results-text'> 
                        <h2> Browse </h2>
                    </div>}
                    {searchTerm && <div className='browse-results-text'>
                        <h2> Search results for </h2>
                        <h2> '{searchTerm}' </h2>
                    </div>}
                    
                    <span>
                        <div id="brand"> 
                            <BrowseFilterDropdown options={brandOptions} placeholder="Brand" updateAction={updateBrowseBrand}/>
                        </div> 

                        <div id="sort" > 
                            <BrowseFilterDropdown options={sortOptions} placeholder="Sort By" updateAction={updateBrowseSort}/>
                        </div> 


                        {/* move these below to somewhere else */}

                        <div id="release"> 
                            <BrowseFilterMultiCheckbox options={releaseYearOptions} title="Release Year" updateAction={updateBrowseReleaseYears}/> 
                        </div>  

                        <div id="gender"> 
                            <BrowseFilterMultiCheckbox options={sizeTypeOptions} title="Size Type" updateAction={updateBrowseSizeTypes}/> 
                        </div>  

                        <div id="price"> 
                            <BrowseFilterMultiCheckbox options={priceOptions} title="Price Ranges" updateAction={updateBrowsePriceRanges}/> 
                        </div>  
                        
                    </span>
                </div>
            </div>

            <div className='browse-catalog'>
                <Catalog searchTerm={searchTerm} />
            </div>

            <Footer colour={'blue'} />
        </div>
    )

}