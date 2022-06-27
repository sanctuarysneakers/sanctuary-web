import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BrowseFilterMultiCheckbox from './browseFilterMultiCheckbox'

import { updateBrowseReleaseYears, updateBrowsePriceRanges } from '../../../redux/actions'
import { releaseYearOptions, priceOptions } from '../../../assets/constants'

export default function BrowseFilterWrapper() {

    let priceRanges = useSelector(state => state.browse.priceRanges)
    let releaseYears = useSelector(state => state.browse.releaseYears)

    return (
        <div>
            <BrowseFilterMultiCheckbox options={priceOptions} title="Price Ranges" updateAction={updateBrowsePriceRanges} initialData={priceRanges}/>
            <BrowseFilterMultiCheckbox options={releaseYearOptions} title="Release Year" updateAction={updateBrowseReleaseYears} initialData={releaseYears} showMoreOption={true} />
        </div>
    )

}