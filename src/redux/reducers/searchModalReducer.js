const searchModalReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_SEARCH_MODAL':
            return true
        case 'HIDE_SEARCH_MODAL':
            return false
        default:
            return state
    }
}

export default searchModalReducer