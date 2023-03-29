import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { hideCategoryFilterModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import CategoryOption from '../Browse/categoryOption'
import { ReactComponent as Close } from '../../assets/images/close.svg'

export default function CategoryFilterModal () {
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  useOutsideAlerter(wrapperRef)

  const categories = ['Adidas', 'Air Force 1', 'Air Jordan', 'Air Max', 'Blazer', 'Converse', 'Dunk', 'New Balance', 'Ultra Boost', 'Yeezy', 'Nike']

  const categoryOptions = categories.map((category) =>
        <CategoryOption key={category} category={category}/>
  )

  return (
        <div className='category-modal'>
            <div className='category-modal-content' ref={wrapperRef}>
                <div className='category-modal-padding'>
                    <div className='category-modal-close'>
                        <button onClick={() => dispatch(hideCategoryFilterModal())}>
                            <Close />
                        </button>
                        </div>

                    <div className='category-modal-text'>
                        <h1> Categories </h1>
                    </div>

                    <div className='category-modal-buttons'>
                        {categoryOptions}
                    </div>
                </div>
            </div>
        </div>
  )
}
