import React from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize, setItemPricesLoading, setItemListingsLoading } from '../redux/actions'
import {ReactComponent as DownArrow} from '../assets/images/arrowDown.svg'

export default function SizeFilter() {

    const dispatch = useDispatch()
    const size = useSelector(state => state.size)

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
        dispatch(updateSize(e.value))
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))
    }

    return (
        <div className='size-filter'>
            <h4> Size {size} </h4>
            <DownArrow />

            <Select
                className='size-filter-content'
                classNamePrefix='size-filter'
                isSearchable={false}
                defaultValue={sizeOptions[Math.round(2 * (size - 6))]}
                options={sizeOptions}
                maxMenuHeight={200}
                menuPlacement={"auto"}
                onChange={handleSizeChange}
            />
        </div>
    )
}