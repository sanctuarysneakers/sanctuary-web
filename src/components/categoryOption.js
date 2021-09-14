import React from 'react'
import { useDispatch } from 'react-redux'
import { hideCategoryFilterModal } from '../redux/actions'

export default function CategoryOption({ category }) {

    const dispatch = useDispatch()

    return (
        <div className='category-option'>

            <div className='category-option-content' onClick={() => {document.location.href = '/browse/' + category; 
                                                                dispatch(hideCategoryFilterModal())}}>
                <p className='category-option-text'>
                    {category}
                </p>
            </div>

        </div>
    )

}