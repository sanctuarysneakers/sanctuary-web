/* The current active item */

const itemReducer = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_ITEM':
            return action.payload
        default:
            return state
    }
}

export default itemReducer