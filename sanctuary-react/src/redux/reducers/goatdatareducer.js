const goatDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'GOAT_CALL':
            return action.payload
        default:
            return state
    }
}

export default goatDataReducer