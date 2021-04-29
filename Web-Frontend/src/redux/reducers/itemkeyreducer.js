
const itemKeyReducer = (state="", action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_KEY':
            return action.payload
        default:
            return state
    }
}

export default itemKeyReducer