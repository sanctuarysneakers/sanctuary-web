import React from 'react'
import { useDispatch } from 'react-redux'
import { hideFilterModal } from '../../redux/actions'
import BrowseFilterMultiCheckbox from './browseFilterMultiCheckbox'
import { updateBrowseBrand, updateBrowseReleaseYears, updateBrowseSizeTypes, updateBrowsePriceRanges } from '../../redux/actions'
import { brandOptions, releaseYearOptions, priceOptions, sizeTypeOptions } from '../../assets/constants'
import { ReactComponent as Close } from '../../assets/images/close.svg'

export default function FilterModal() {

    const dispatch = useDispatch()

    return (
        <div className='modal-filter'>
            <div className='filter'>
                <div className='filter-content'>
                    <div className='filter-header'>
                        <h2 className='filter-title'>
                            Filter
                        </h2>

                        <div className='filter-close'>
                            <button onClick={() => dispatch(hideFilterModal())}>
                                <Close />
                            </button>
                        </div>
                    </div>

                    <div className='filter-checkboxes'>
                        <BrowseFilterMultiCheckbox options={priceOptions} title="Price Ranges" updateAction={updateBrowsePriceRanges} showMoreOption={false}/> 
                        <BrowseFilterMultiCheckbox options={releaseYearOptions} title="Release Year" updateAction={updateBrowseReleaseYears} showMoreOption={true}/>  
                    </div>
                </div>
            </div>
        </div>
    )
}