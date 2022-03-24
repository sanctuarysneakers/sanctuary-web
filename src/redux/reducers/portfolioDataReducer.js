
const portfolioDataReducer = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_PORTFOLIO_DATA':
            return action.payload
        default:
            return state
    }
}

export default portfolioDataReducer