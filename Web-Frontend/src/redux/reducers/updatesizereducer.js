const updateSizeReducer = (state = 10, action) => {
    switch(action.type) {
        case 'UPDATE_SIZE':
            return action.payload
        default:
            return state
    }
}

export default updateSizeReducer;