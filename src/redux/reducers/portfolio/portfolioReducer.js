import { combineReducers } from 'redux'

const portfolioStatsInitialState = {
  total: 0,
  priceChange: 0,
  percentChange: 0
}

const loadingPortfolioReducer = (state = true, action) => {
  switch (action.type) {
  case 'LOADING_PORTFOLIO':
    return action.payload
  default:
    return state
  }
}

const portfolioDataReducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_PORTFOLIO_DATA':
    return action.payload
  default:
    return state
  }
}

const portfolioStatsReducer = (state = portfolioStatsInitialState, action) => {
  switch (action.type) {
  case 'UPDATE_PORTFOLIO_STATS':
    return action.payload
  default:
    return state
  }
}

const portfolioItemModalDataReducer = (state = {}, action) => {
  switch (action.type) {
  case 'UPDATE_PORTFOLIO_ITEM_MODAL_DATA':
    return action.payload
  default:
    return state
  }
}

const portfolio = combineReducers({
  loadingPortfolio: loadingPortfolioReducer,
  data: portfolioDataReducer,
  stats: portfolioStatsReducer,
  modalData: portfolioItemModalDataReducer
})

export default portfolio
