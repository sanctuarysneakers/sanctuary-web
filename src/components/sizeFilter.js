import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showSizeModal } from '../redux/actions'
import {ReactComponent as DownArrow} from '../assets/images/arrowDown.svg'

export default function SizeFilter() {

    const dispatch = useDispatch()
    const size = useSelector(state => state.size)

    return (
        <div className='size-filter' onClick={() => dispatch(showSizeModal())}>
            <h4> Size {size} </h4>
            <DownArrow />
        </div>
    )
}