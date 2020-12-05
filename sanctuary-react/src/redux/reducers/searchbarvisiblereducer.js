const searchBarVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_SEARCH_BAR':
            return true
        case 'HIDE_SEARCH_BAR':
            return false
        default:
            return state
    }
}

export default searchBarVisibleReducer