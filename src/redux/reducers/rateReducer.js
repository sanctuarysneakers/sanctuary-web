
const rateReducer = (state=1, action) => {
    switch(action.type) {
        case 'UPDATE_RATE':
            return action.payload
        default:
            return state
    }
}

export default rateReducer