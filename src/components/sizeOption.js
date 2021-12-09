import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize, setItemPricesLoading, setItemListingsLoading, hideSizeModal } from '../redux/actions'

export default function SizeOption({ option, size }) {

    const dispatch = useDispatch()
    const gender = useSelector(state => state.gender)

    const genderSymbol = (gender === 0) ? 'M' : 'W'

    const handleSizeChange = () => {
        gender === 1 ? updateSize(option - 1.5) : updateSize(option)
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