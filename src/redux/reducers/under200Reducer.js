const under200Reducer = (state=[], action) => {
    switch (action.type) {
        case 'UNDER_200_CALL':
            return action.payload
        default:
            return state
    }
}

export default under200Reducer