import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSizeModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import SizeOption from '../Item/sizeOption'
import { ReactComponent as Close } from '../../assets/images/close.svg'

export default function SizeModal({ gender }) {

    const dispatch = useDispatch()

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    const size = useSelector(state => state.size)

    const mensSneakerSizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14]
    const womensSneakerSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]

    const sizeOptions = (gender === 'men') ?
        mensSneakerSizes.map((number) => 
            <SizeOption option={number} size={size} gender={gender} />)
        :
        womensSneakerSizes.map((number) => 
            <SizeOption option={number} size={size} gender={gender} />)

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
                    </div>

                    <div className='size-modal-buttons'>
                        {sizeOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}