import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showSizeModal } from '../../redux/actions'
import {ReactComponent as DownArrow} from '../../assets/images/arrowDown.svg'

export default function SizeFilter({ gender }) {

    const dispatch = useDispatch()
    const size = useSelector(state => state.item.size)
    const genderSymbol = (gender === 'men') ? 'M' : 'W'

    return (
        <div className='size-filter' onClick={() => dispatch(showSizeModal())}>
            <h4> Size {genderSymbol} {size} </h4>
            <DownArrow />
        </div>
    )
}