const itemHitReducer = (state = false, action) => {
    switch(action.type) {
        case 'NEW_ITEM_HIT':
            return !state
        default:
            return state
    }
}

export default itemHitReducer