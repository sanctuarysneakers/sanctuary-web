import React from 'react'
import { useDispatch } from 'react-redux'
import { showSocialsModal } from '../../redux/actions'
import {ReactComponent as DownArrow} from '../../assets/images/arrowDown.svg'

export default function SocialsButton() {

    const dispatch = useDispatch()

    return (
        <div className='size-filter' onClick={() => dispatch(showSocialsModal())}>
            <h4> Share This Shoe </h4>
            <DownArrow />
        </div>
    )
}