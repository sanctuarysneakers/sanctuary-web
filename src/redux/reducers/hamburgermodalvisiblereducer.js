const hamburgerModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_HAMBURGER_MODAL':
            return true
        case 'HIDE_HAMBURGER_MODAL':
            return false
        default:
            return state
    }
}

export default hamburgerModalVisibleReducer