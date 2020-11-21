const shopNowScrollReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOP_NOW_SCROLL':
            return !state
        default:
            return state
    }
}

export default shopNowScrollReducer