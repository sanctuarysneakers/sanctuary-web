const homeSearchVisibleReducer = (state = true, action) => {
    switch(action.type) {
        case 'SHOW_HOME_SEARCH':
            return true
        case 'HIDE_HOME_SEARCH':
            return false
        default:
            return state
    }
}

export default homeSearchVisibleReducer