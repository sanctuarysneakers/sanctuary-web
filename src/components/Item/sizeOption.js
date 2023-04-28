import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize, updateBrowseGender, setItemPricesLoading, setItemListingsLoading, hideSizeModal } from '../../redux/actions'

export default function SizeOption ({ sizeOption, sizeState, gender, inBrowseFilter }) {
  const dispatch = useDispatch()

  const browseGender = useSelector(state => state.browse.filters.gender)

  const isCurrent = sizeOption === sizeState && gender === browseGender
  const genderSymbol = gender === 'men' ? 'M' : 'W'

  const handleSizeChange = () => {
    dispatch(updateSize(sizeOption))
    dispatch(hideSizeModal())
    dispatch(setItemPricesLoading(true))
    dispatch(setItemListingsLoading(true))

    if (inBrowseFilter) { dispatch(updateBrowseGender(gender)) }
  }

  return (
    <div className={isCurrent ? 'size-option current' : 'size-option'}>
      <div className='size-option-content' onClick={handleSizeChange}>
        <p className={isCurrent ? 'size-option-text current' : 'size-option-text'}>
          US {genderSymbol} {sizeOption}
        </p>
      </div>
    </div>
  )
}

SizeOption.propTypes = {
  sizeOption: PropTypes.string,
  sizeState: PropTypes.number,
  gender: PropTypes.string,
  inBrowseFilter: PropTypes.bool
}
