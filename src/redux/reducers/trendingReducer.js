const trendingReducer = (state=[], action) => {
    switch (action.type) {
        case 'TRENDING_CALL':
            return action.payload
        default:
            return state
    }
}

export default trendingReducer