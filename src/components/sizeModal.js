import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSizeModal, updateGender, updateSize } from '../redux/actions'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import SizeOption from './sizeOption'
import { ReactComponent as Close } from '../assets/images/close.svg'

export default function SizeModal() {

    const size = useSelector(state => state.size)
    const gender = useSelector(state => state.gender)
    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    const mensSneakerSizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14]
    const womensSneakerSizes = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5]

    const sizeOptions = (gender === 0) ? mensSneakerSizes.map((number) => 
    <SizeOption option={number} size={size} />) : womensSneakerSizes.map((number) => 
    <SizeOption option={number} size={size} />)

    function changeGender(newGender) {
        dispatch(updateGender(newGender))
        dispatch(updateSize(10))
    }

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

                        <div className='gender-select'>
                            {gender == 0 && 
                             <p> <b> Mens </b> | <button className='gender-button'
                              onClick={() => changeGender(1)}> Womens </button></p>
                            }
                            
                            {gender === 1 && 
                            <p> <button className='gender-button' onClick={() => changeGender(0)}>
                                 Mens </button>| <b> Womens </b></p>
                            }
                        </div>
                    </div>

                    <div className='size-modal-buttons'>
                        {sizeOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}