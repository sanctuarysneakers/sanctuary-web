import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { hideFiltersModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import BrandOption from '../Browse/brandOption'
import SizeOption from '../Item/sizeOption'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { brands, sneakerSizes } from '../../assets/constants'

export default function FiltersModal () {
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  useOutsideAlerter(wrapperRef)

  const brandOptions = brands.map((brand) =>
    <BrandOption key={brand} brand={brand}/>
  )

  const mensSizeOptions = sneakerSizes.map((number) =>
    <SizeOption key={number} option={number} size={10} gender={'men'} />
  )

  const womensSizeOptions = sneakerSizes.map((number) =>
    <SizeOption key={number} option={number} size={10} gender={'women'} />
  )

  return (
    <div className='filters-modal'>
      <div className='filters-modal-content' ref={wrapperRef}>
        <div className='filters-modal-padding'>
          <div className='filters-modal-close'>
            <button onClick={() => dispatch(hideFiltersModal())}>
              <Close />
            </button>
          </div>

          <div className='filters-modal-main'>
            <div className='filters-modal-text'>
              <h1> Brands </h1>
            </div>
            <div className='filters-modal-buttons'>
              {brandOptions}
            </div>

            <div className='filters-modal-text'>
              <h1> Men's Sizes </h1>
            </div>
            <div className='filters-modal-buttons'>
              {mensSizeOptions}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
