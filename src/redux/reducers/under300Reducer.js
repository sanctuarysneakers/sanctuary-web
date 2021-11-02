const under300Reducer = (state=[], action) => {
    switch (action.type) {
        case 'UNDER_300_CALL':
            return action.payload
        default:
            return state
    }
}

export default under300Reducer