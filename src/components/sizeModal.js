import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSizeModal } from '../redux/actions'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import SizeOption from './sizeOption'
import { ReactComponent as Close } from '../assets/images/close.svg'

export default function SizeModal() {

    const size = useSelector(state => state.size)
    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    const sneakerSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13]

    const sizeOptions = sneakerSizes.map((number) => 
        <SizeOption option={number} size={size} />
    )

    return (
        <div className='size-modal'>
            <div className='size-modal-content' ref={wrapperRef}>
                <div className='size-modal-padding'>
                    <div className='size-modal-close'>
						<button onClick={() => dispatch(hideSizeModal())}>
							<Close />
						</button>
					</div>

                    <div className='size-modal-text'>
                        <h1> Select your size </h1>
                        <p> Mens </p>
                    </div>

                    <div className='size-modal-buttons'>
                        {sizeOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}