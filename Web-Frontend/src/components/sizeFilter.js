import React from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { updateSize } from '../redux/actions'

export default function SizeFilter() {

    const dispatch = useDispatch()

    const sizeOptions = [
        { label: '6', value: 6 },
        { label: '6.5', value: 6.5 },
        { label: '7', value: 7 },
        { label: '7.5', value: 7.5 },
        { label: '8', value: 8 },
        { label: '8.5', value: 8.5 },
        { label: '9', value: 9 },
        { label: '9.5', value: 9.5 },
        { label: '10', value: 10 },
        { label: '10.5', value: 10.5 },
        { label: '11', value: 11 },
        { label: '11.5', value: 11.5 },
        { label: '12', value: 12 },
        { label: '12.5', value: 12.5 },
        { label: '13', value: 13 }
    ]

    const handleSizeChange = (e) => {
        const newSize = e.value;
        dispatch(updateSize(newSize))
    }

    return (
        <div className='size-filter'>
            <h4> Select size </h4>

            <Select
                className='size-filter-content'
                classNamePrefix='size-filter'
                isSearchable={false}
                defaultValue={sizeOptions[8]}
                options={sizeOptions}
                onChange={handleSizeChange}
            />
        </div>
    )
}