import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { hideBrandsFilterModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import BrandOption from '../Browse/brandOption'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { brands } from '../../assets/constants'

export default function BrandsFilterModal () {
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  useOutsideAlerter(wrapperRef)

  const brandOptions = brands.map((brand) =>
    <BrandOption key={brand} brand={brand}/>
  )

  return (
    <div className='brands-modal'>
      <div className='brands-modal-content' ref={wrapperRef}>
        <div className='brands-modal-padding'>
          <div className='brands-modal-close'>
            <button onClick={() => dispatch(hideBrandsFilterModal())}>
              <Close />
            </button>
          </div>

          <div className='brands-modal-text'>
            <h1> Brands </h1>
          </div>

          <div className='brands-modal-buttons'>
            {brandOptions}
          </div>
        </div>
      </div>
    </div>
  )
}
