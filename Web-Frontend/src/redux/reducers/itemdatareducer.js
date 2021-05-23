
const itemDataReducer = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_DATA':
            return action.payload
        default:
            return state
    }
}

export default itemDataReducer