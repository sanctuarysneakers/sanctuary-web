const aboutModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_ABOUT_MODAL':
            return true
        case 'HIDE_ABOUT_MODAL':
            return false
        default:
            return state
    }
}

export default aboutModalVisibleReducer