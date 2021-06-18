const sneakerListReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_SNEAKERS':
            return action.payload
        default:
            return state
    }
}

export default sneakerListReducer;