import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter } from '../redux/actions'


export default function FilterBar() {

    const dispatch = useDispatch()

    return (
        <div className="filterBar">

            <button className='filter'> Filters </button>

            <label> Size Filter:
                <input 
                    type='number' 
                    onChange={e => dispatch(updateSizeFilter(e.target.value))}
                />
            </label>

            <label> Price Low Filter:
                <input 
                    type='number' 
                    onChange={e => dispatch(updatePriceLowFilter(e.target.value))}
                />
            </label>

            <label> Price High Filter:
                <input 
                    type='number' 
                    onChange={e => dispatch(updatePriceHighFilter(e.target.value))}
                />
            </label>

            <button type='reset'> Clear </button>

        </div>
    )
}