const grailedDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'GRAILED_CALL':
            return action.payload
        default:
            return state
    }
}

export default grailedDataReducer