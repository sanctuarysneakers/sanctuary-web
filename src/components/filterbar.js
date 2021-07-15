import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter, clearFilter} from '../redux/actions'

export default function FilterBar() {

    const dispatch = useDispatch()
    const [filtersVisibile, toggleFilters] = useState(false)
    const filter = useSelector(state => state.filter)

    const defaultFilter = {
        'size': '10',
        'price_low': '0',
        'price_high': '100000'
    }

    function handleChange(e, field) {
        let value = e.target.value

        if (value === '')
            value = defaultFilter[field]

        let dispatchMap = {
            'size': updateSizeFilter,
            'price_low': updatePriceLowFilter,
            'price_high': updatePriceHighFilter
        }
        dispatch(dispatchMap[field](value))
    }

    const handleClear = () => {
        dispatch(clearFilter())
    }

    const filters = (
        <div className='three-filters'>
            <div className='sizeFilter'>
                <div className='sizeText'> Size </div>
                <input
                    className='sizeBox'
                    placeholder="10"
                    onFocus={e => e.target.placeholder = ""}
                    onBlur={e => e.target.placeholder = "10"}
                    type='number'
                    onChange={e => handleChange(e, 'size')}
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
                    onChange={e => handleChange(e, 'price_low')}
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
                    onChange={e => handleChange(e, 'price_high')}
                    value={filter.price_high}
                />
            </div>
        </div>
    );

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
    );
}