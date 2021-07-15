
const itemInfoReducer = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_INFO':
            return action.payload
        default:
            return state
    }
}

export default itemInfoReducer