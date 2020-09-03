import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter, clearFilter } from '../redux/actions'


export default function FilterBar() {

    const dispatch = useDispatch()

    const [filtersVisibile, toggleFilters] = useState(false)

    // the amount of ms that must pass before 
    //the user has considered to have stopped typing.
    const SLEEP_TIME = 500

    let typingTimer = null;

    useEffect(() => {
        return () => clearTimeout(typingTimer)
    }, [])

    const handleSizeChange = e => {
        const val = e.target.value
        clearTimeout(typingTimer)
        typingTimer = setTimeout(() => dispatch(updateSizeFilter(val)), SLEEP_TIME)
    }

    const handlePriceLowChange = e => {
        const val = e.target.value
        clearTimeout(typingTimer)
        typingTimer = setTimeout(() => dispatch(updatePriceLowFilter(val)), SLEEP_TIME)
    }

    const handlePriceHighChange = e => {
        const val = e.target.value
        clearTimeout(typingTimer)
        typingTimer = setTimeout(() => dispatch(updatePriceHighFilter(val)), SLEEP_TIME)
    }

    return (
        <React.Fragment>

            {/* Desktop Filter Bar */}

            <div className="filterBar desktop-filters">

                <button className='filters'>
                    Filters
                </button>

                    <div className='three-filters'>
                        <div className='sizeFilter'>
                            <div className='sizeText'> Size </div>
                            <input
                                className='sizeBox'
                                placeholder="All"
                                onFocus={e => e.target.placeholder = ""}
                                onBlur={e => e.target.placeholder = "All"} 
                                type='number'
                                onChange={handleSizeChange}
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
                                onChange={handlePriceLowChange}
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
                                onChange={handlePriceHighChange}
                            />
                        </div>
                    </div>

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

                {
                    filtersVisibile &&
                    <div className='three-filters'>
                        <div className='sizeFilter'>
                            <div className='sizeText'> Size </div>
                            <input
                                className='sizeBox'
                                placeholder="All"
                                type='number'
                                onChange={handleSizeChange}
                            />
                        </div>

                        <div className='priceFromFilter'>
                            <div className='priceFromText'> Price From </div>
                            <input
                                className='priceFromBox'
                                placeholder="All"
                                type='number'
                                onChange={handlePriceLowChange}
                            />
                        </div>

                        <div className='priceToFilter'>
                            <div className='priceToText'> Price To </div>
                            <input
                                className='priceToBox'
                                placeholder="All"
                                type='number'
                                onChange={handlePriceHighChange}
                            />
                        </div>
                    </div>
                }

                <button className='clear'
                    onClick={() => dispatch(clearFilter())}
                >
                    Clear
            </button>

            </div>
        </React.Fragment>
    )
}