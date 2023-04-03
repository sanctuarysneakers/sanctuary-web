import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { updateCurrency, setItemPricesLoading, setItemListingsLoading, hideCurrencyModal } from '../../redux/actions'
import { currencyFlagMap, currencySymbolMapWithAbbrev } from '../../assets/constants'

export default function CurrencyOption ({ option, currency }) {
  const dispatch = useDispatch()

  const handleCurrencyChange = () => {
    dispatch(updateCurrency(option))
    dispatch(hideCurrencyModal())
    dispatch(setItemPricesLoading(true))
    dispatch(setItemListingsLoading(true))
  }

  return (
    <div className={(option === currency) ? 'currency-option current' : 'currency-option'}>

      <div className='currency-option-content' onClick={handleCurrencyChange}>
        <div className={(option === currency) ? 'currency-option-text current' : 'currency-option-text'}>
          <img src={currencyFlagMap[option]} alt='flag' />
          <p> {currencySymbolMapWithAbbrev[option]} </p>
        </div>
      </div>

    </div>
  )
}

CurrencyOption.propTypes = {
  option: PropTypes.string,
  currency: PropTypes.string
}
