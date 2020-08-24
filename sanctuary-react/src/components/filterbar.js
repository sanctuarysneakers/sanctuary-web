import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSizeFilter, updatePriceLowFilter, updatePriceHighFilter, clearFilter } from '../redux/actions'


export default function FilterBar() {

    // TODO: catch .5 shoe sizes

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    return (
        <div className="filterBar">

            <button className='filters'> 
                Filters 
            </button>

            <div className='sizeFilter'>
                <div className='sizeText'> Size </div>
                    <input
                        className='sizeBox'
                        placeholder="All"
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
                        type='number'
                        onChange={e => dispatch(updatePriceHighFilter(e.target.value))}
                        value={filter.price_high}
                    />
            </div>

            <button className='clear'
                onClick={() => dispatch(clearFilter())}
            > 
                Clear 
            </button>

        </div>
    )
}