import React from 'react'
import { useDispatch } from 'react-redux'
import { hideCategoryFilterModal } from '../../redux/actions'
import PropTypes from 'prop-types'

export default function CategoryOption ({ category }) {
  const dispatch = useDispatch()

  const clickHandler = () => {
    document.location.href = '/browse/' + category
    dispatch(hideCategoryFilterModal())
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

CategoryOption.propTypes = {
  category: PropTypes.string
}
