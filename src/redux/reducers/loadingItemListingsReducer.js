
const loadingItemListingsReducer = (state=true, action) => {
    switch(action.type) {
        case 'LOADING_ITEM_LISTINGS':
            return action.payload
        default:
            return state
    }
}

export default loadingItemListingsReducer