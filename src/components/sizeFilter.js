import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showSizeModal } from '../redux/actions'
import {ReactComponent as DownArrow} from '../assets/images/arrowDown.svg'

export default function SizeFilter() {

    const dispatch = useDispatch()
    const size = useSelector(state => state.size)
    const gender = useSelector(state => state.gender)
    const genderSymbol = (gender === 0) ? 'M' : 'W'

    const displayedSize = (gender === 0) ? size : size + 1.5

    return (
        <div className='size-filter' onClick={() => dispatch(showSizeModal())}>
            <h4> Size {genderSymbol} {displayedSize} </h4>
            <DownArrow />
        </div>
    )
}