const shoeComparisonDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SHOE_COMPARISON_CALL':
            return action.payload
        default:
            return state
    }
}

export default shoeComparisonDataReducer