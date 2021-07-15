
const browseDataReducer = (state=[], action) => {
    switch (action.type) {
        case 'BROWSE_CALL':
            return action.payload
        default:
            return state
    }
}

export default browseDataReducer