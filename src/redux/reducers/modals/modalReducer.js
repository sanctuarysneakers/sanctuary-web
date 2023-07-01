import { combineReducers } from 'redux'

const aboutModalVisibleReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_ABOUT_MODAL':
    return true
  case 'HIDE_ABOUT_MODAL':
    return false
  default:
    return state
  }
}

const currencyModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_CURRENCY_MODAL':
    return true
  case 'HIDE_CURRENCY_MODAL':
    return false
  default:
    return state
  }
}

const deleteModalVisibleReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_DELETE_MODAL':
    return true
  case 'HIDE_DELETE_MODAL':
    return false
  default:
    return state
  }
}

const filtersModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_FILTERS_MODAL':
    return true
  case 'HIDE_FILTERS_MODAL':
    return false
  default:
    return state
  }
}

const hamburgerModalVisibleReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_HAMBURGER_MODAL':
    return true
  case 'HIDE_HAMBURGER_MODAL':
    return false
  default:
    return state
  }
}

const locationPopupReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_LOCATION_POPUP':
    return action.payload
  case 'HIDE_LOCATION_POPUP':
    return false
  default:
    return state
  }
}

const portfolioModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_PORTFOLIO_MODAL':
    return true
  case 'HIDE_PORTFOLIO_MODAL':
    return false
  default:
    return state
  }
}

const searchModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_SEARCH_MODAL':
    return true
  case 'HIDE_SEARCH_MODAL':
    return false
  default:
    return state
  }
}

const sizeModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_SIZE_MODAL':
    return true
  case 'HIDE_SIZE_MODAL':
    return false
  default:
    return state
  }
}

const socialsModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_SOCIALS_MODAL':
    return true
  case 'HIDE_SOCIALS_MODAL':
    return false
  default:
    return state
  }
}

const sortByModalReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_SORT_BY_MODAL':
    return true
  case 'HIDE_SORT_BY_MODAL':
    return false
  default:
    return state
  }
}

const modals = combineReducers({
  filtersModalVisible: filtersModalReducer,
  sortByModalVisible: sortByModalReducer,
  sizeModalVisible: sizeModalReducer,
  searchModalVisible: searchModalReducer,
  locationPopupVisible: locationPopupReducer,
  aboutModalVisible: aboutModalVisibleReducer,
  currencyModalVisible: currencyModalReducer,
  deleteModalVisible: deleteModalVisibleReducer,
  hamburgerModalVisible: hamburgerModalVisibleReducer,
  socialsModalVisible: socialsModalReducer,
  portfolioModalVisible: portfolioModalReducer
})

export default modals
