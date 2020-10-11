const privacyModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_PRIVACY_MODAL':
            return true
        case 'HIDE_PRIVACY_MODAL':
            return false
        default:
            return state
    }
}

export default privacyModalVisibleReducer