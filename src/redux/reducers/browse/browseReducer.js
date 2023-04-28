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

const brandsReducer = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_BROWSE_BRAND':
    // if brand is already in state remove it, otherwise add it
    return state.includes(action.payload)
      ? state.filter(brand => brand !== action.payload)
      : [...state, action.payload]
  case 'RESET_FILTERS':
    return []
  default:
    return state
  }
}

const sortReducer = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_BROWSE_SORT':
    return action.payload
  case 'RESET_FILTERS':
    return null
  default:
    return state
  }
}

const filters = combineReducers({
  brands: brandsReducer,
  sort: sortReducer
})

const browse = combineReducers({
  browseData: browseDataReducer,
  featuredCollections: featuredCollectionsReducer,
  filters
})

export default browse
