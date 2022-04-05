import React from 'react'
import { useDispatch } from 'react-redux'
import { hideCategoryFilterModal } from '../../redux/actions'

export default function CategoryOption({ category }) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        window.analytics.track(`browse_category_option_clicked`, {category: category});
        document.location.href = '/browse/' + category; 
        dispatch(hideCategoryFilterModal());
    }

    return (
        <div className='category-option'>

            <div className='category-option-content' onClick={clickHandler}>
                <p className='category-option-text'>
                    {category}
                </p>
            </div>

        </div>
    )

}