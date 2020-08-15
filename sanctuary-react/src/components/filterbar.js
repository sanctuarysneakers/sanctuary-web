import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter, clearFilter } from '../redux/actions'


export default function FilterBar() {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    return (
        <div className="filterBar">

            <button className='filter'> Filters </button>

            <label> Size Filter:
                <input
                    type='number'
                    onChange={e => dispatch(updateSizeFilter(e.target.value))}
                    value={filter.size}
                />
            </label>

            <label> Price Low Filter:
                <input
                    type='number'
                    onChange={e => dispatch(updatePriceLowFilter(e.target.value))}
                    value={filter.price_low}
                />
            </label>

            <label> Price High Filter:
                <input
                    type='number'
                    onChange={e => dispatch(updatePriceHighFilter(e.target.value))}
                    value={filter.price_high}
                />
            </label>

            <button
                onClick={() => dispatch(clearFilter())}
            > 
                Clear 
            </button>

        </div>
    )
}