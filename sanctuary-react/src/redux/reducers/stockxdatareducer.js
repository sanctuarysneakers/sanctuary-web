const stockxDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'STOCKX_CALL':
            return action.payload
        default:
            return state
    }
}

export default stockxDataReducer