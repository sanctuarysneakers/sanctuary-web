const currencyReducer = (state = 'USD', action) => {
    switch(action.type) {
        case 'UPDATE_CURRENCY':
            return action.payload
        default:
            return state
    }
}

export default currencyReducer;