
const itemPricesReducer = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_PRICES':
            return action.payload
        default:
            return state
    }
}

export default itemPricesReducer