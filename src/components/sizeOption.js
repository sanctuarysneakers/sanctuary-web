import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSize, setItemPricesLoading, setItemListingsLoading, hideSizeModal } from '../redux/actions'

export default function SizeOption({ option, size, gender }) {

    const dispatch = useDispatch()

    const genderSymbol = (gender === 'men') ? 'M' : 'W'

    const handleSizeChange = () => {
        dispatch(updateSize(option))
        dispatch(hideSizeModal())
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))
    }
    
    return (
        <div className={(option === size) ? 'size-option current' : 'size-option'}>

            <div className='size-option-content' onClick={handleSizeChange}>
                <p className={(option === size) ? 'size-option-text current' : 'size-option-text'}>
                    US {genderSymbol} {option}
                </p>
            </div>

        </div>
    )

}