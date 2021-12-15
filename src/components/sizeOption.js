import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize, setItemPricesLoading, setItemListingsLoading, hideSizeModal } from '../redux/actions'

export default function SizeOption({ option, size }) {

    const dispatch = useDispatch()
    const gender = useSelector(state => state.gender)

    const genderSymbol = (gender === 0) ? 'M' : 'W'

    const handleSizeChange = () => {
        gender === 1 ? dispatch(updateSize(option - 1.5)) : dispatch(updateSize(option))
        dispatch(hideSizeModal())
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))
    }
    
    const currentOption = (gender === 0) ? size : size + 1.5
    return (
        <div className={(option === currentOption) ? 'size-option current' : 'size-option'}>

            <div className='size-option-content' onClick={handleSizeChange}>
                <p className={(option === size) ? 'size-option-text current' : 'size-option-text'}>
                    US {genderSymbol} {option}
                </p>
            </div>

        </div>
    )

}