
const itemListingsReducer = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_LISTINGS':
            return action.payload
        default:
            return state
    }
}

export default itemListingsReducer