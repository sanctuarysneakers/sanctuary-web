import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter, clearFilter } from '../redux/actions'


export default function FilterBar() {

    const dispatch = useDispatch()
    const [filtersVisibile, toggleFilters] = useState(false)

    // Wait until user doesn't type for half a second to update catalog
    const SLEEP_TIME = 500
    let filterChangeTimer = null

    const handleChange = (e, field) => {

        const value = e.target.value

        let dispatchMap = {
            'size': updateSizeFilter,
            'price_low': updatePriceLowFilter,
            'price_high': updatePriceHighFilter
        }

        clearTimeout(filterChangeTimer)
        filterChangeTimer = setTimeout(() => {
            dispatch(dispatchMap[field](value))
        }, SLEEP_TIME)
    }

    // Clearing the filter values no longer works !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const handleClear = () => {
        dispatch(clearFilter())
    }

    const filters = (
        <div className='three-filters'>
            <div className='sizeFilter'>
                <div className='sizeText'> Size </div>
                <input
                    className='sizeBox'
                    placeholder="All"
                    onFocus={e => e.target.placeholder = ""}
                    onBlur={e => e.target.placeholder = "All"}
                    type='number'
                    onChange={e => handleChange(e, 'size')}
                />
            </div>

            <div className='priceFromFilter'>
                <div className='priceFromText'> Price From </div>
                <input
                    className='priceFromBox'
                    placeholder="All"
                    onFocus={e => e.target.placeholder = ""}
                    onBlur={e => e.target.placeholder = "All"}
                    type='number'
                    onChange={e => handleChange(e, 'price_low')}
                />
            </div>

            <div className='priceToFilter'>
                <div className='priceToText'> Price To </div>
                <input
                    className='priceToBox'
                    placeholder="All"
                    onFocus={e => e.target.placeholder = ""}
                    onBlur={e => e.target.placeholder = "All"}
                    type='number'
                    onChange={e => handleChange(e, 'price_high')}
                />
            </div>
        </div>
    )

    return (
        <React.Fragment>

            {/* Desktop Filter Bar */}

            <div className="filterBar desktop-filters">

                <button className='filters'>
                    Filters
                </button>

                {filters}

                <button className='clear'
                    onClick={() => handleClear()}>
                    Clear
                </button>

            </div>

            {/* Mobile Filter Bar */}

            <div className="filterBar mobile-filters">

                <button
                    className='filters'
                    onClick={() => toggleFilters(prev => !prev)}>
                    Filters
                </button>

                {filtersVisibile && filters}

                <button className='clear'
                    onClick={() => handleClear()}>
                    Clear
                </button>

            </div>
        </React.Fragment>
    )
}