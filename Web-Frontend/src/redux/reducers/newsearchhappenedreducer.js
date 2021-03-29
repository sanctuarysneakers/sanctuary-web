const newSearchHappenedReducer = (state = false, action) => {
    switch(action.type) {
        case 'NEW_SEARCH_HAPPENED':
            return !state
        default:
            return state
    }
}

export default newSearchHappenedReducer