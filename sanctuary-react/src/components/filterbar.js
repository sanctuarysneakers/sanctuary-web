import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter, clearFilter } from '../redux/actions'


export default function FilterBar() {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const [filtersVisibile, toggleFilters] = useState(false)

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
                    onChange={e => dispatch(updateSizeFilter(e.target.value))}
                    value={filter.size}
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
                    onChange={e => dispatch(updatePriceLowFilter(e.target.value))}
                    value={filter.price_low}
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
                    onChange={e => dispatch(updatePriceHighFilter(e.target.value))}
                    value={filter.price_high}
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
                    onClick={() => dispatch(clearFilter())}>
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
                    onClick={() => dispatch(clearFilter())}>
                    Clear
                </button>

            </div>
        </React.Fragment>
    )
}