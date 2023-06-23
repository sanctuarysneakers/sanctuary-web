import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

  const sizeState = useSelector(state => state.size)

  const brandOptions = brands.map((brand) =>
    <BrandOption key={brand} brand={brand} />
  )

  const mensSizeOptions = sneakerSizes.map((size) =>
    <SizeOption
      key={size}
      sizeOption={size}
      sizeState={sizeState}
      gender={'men'}
      inBrowseFilter={true}
    />
  )

  const womensSizeOptions = sneakerSizes.map((size) =>
    <SizeOption
      key={size}
      sizeOption={size}
      sizeState={sizeState}
      gender={'women'}
      inBrowseFilter={true}
    />
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
              <h1> Men&apos;s Sizes </h1>
            </div>
            <div className='filters-modal-buttons'>
              {mensSizeOptions}
            </div>

            <div className='filters-modal-text'>
              <h1> Women&apos;s Sizes </h1>
            </div>
            <div className='filters-modal-buttons'>
              {womensSizeOptions}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
