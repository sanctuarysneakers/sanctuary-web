import { combineReducers } from 'redux'

const portfolioReducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_PORTFOLIO_DATA':
    return action.payload
  default:
    return state
  }
}

const loadingPortfolioReducer = (state = true, action) => {
  switch (action.type) {
  case 'LOADING_PORTFOLIO':
    return action.payload
  default:
    return state
  }
}

const portfolio = combineReducers({
  portfolioData: portfolioReducer,
  loadingPortfolio: loadingPortfolioReducer
})

export default portfolio
