import React, { useRef } from 'react'
import useOutsideAlerter from '../Hooks/useoutsidealerter'
import { useDispatch, useSelector } from 'react-redux'
import { RiCloseLine } from 'react-icons/ri'
import Select from 'react-select'
import { updateSize, hideFilter } from '../../redux/actions'

export default function FilterModal() {

    // For Site Redesign

    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)
    const size = useSelector(state => state.size);

    const sizeOptions = [
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
        { label: '13', value: 13 }
    ];

    const handleSizeChange = (e) => {
        const newSize = e.value;
        dispatch(updateSize(newSize));
    }

    return (
        <div className="modal-filter">
            
            <div className="filters" ref={wrapperRef}>
                <div className='close-area'>
                    <div className='closeButton'
                        onClick={() => dispatch(hideFilter())}>
                        <RiCloseLine />
                    </div>
                </div> 
                <div className='filterBox'>
                    <Select
                        className='currencyFilter'
                        value={sizeOptions.find(obj => obj.value === size)} // Default currency is USD
                        options={sizeOptions} 
                        onChange={handleSizeChange}
                    />
                </div>
            </div>

        </div>
    )
}