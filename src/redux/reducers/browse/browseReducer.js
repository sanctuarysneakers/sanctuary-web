import { combineReducers } from 'redux'

const browseDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'BROWSE_CALL':
      return action.payload
    default:
      return state
  }
}

const featuredCollectionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_FEATURED_COLLECTIONS':
      return action.payload
    default:
      return state
  }
}

// filters

const brandReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_BROWSE_BRAND':
      return action.payload
    default:
      return state
  }
}

const sortReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_BROWSE_SORT':
      return action.payload
    default:
      return state
  }
}

const priceRangeReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_BROWSE_PRICE_RANGES':
      return action.payload
    default:
      return state
  }
}

const sizeTypeReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_BROWSE_SIZE_TYPES':
      return action.payload
    default:
      return state
  }
}

const releaseYearReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_BROWSE_RELEASE_YEARS':
      return action.payload
    default:
      return state
  }
}

const browseFilters = combineReducers({
  brand: brandReducer,
  sort: sortReducer,
  priceRanges: priceRangeReducer,
  sizeTypes: sizeTypeReducer,
  releaseYears: releaseYearReducer
})

const browseFiltersReducerWrapper = (state, action) => {
  if (action.type === 'RESET_FILTERS') {
    state = undefined
  }
  return browseFilters(state, action)
}

const browse = combineReducers({
  browseData: browseDataReducer,
  featuredCollections: featuredCollectionsReducer,
  filters: browseFiltersReducerWrapper
})

export default browse
