
const loadingItemPricesReducer = (state=true, action) => {
    switch(action.type) {
        case 'LOADING_ITEM_PRICES':
            return action.payload
        default:
            return state
    }
}

export default loadingItemPricesReducer