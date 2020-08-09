const apiDataReducer = (state = [], action) => {
    switch(action.type) {
        case 'API_CALL':
            return action.payload
        default:
            return state
    }
}

export default apiDataReducer