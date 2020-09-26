const termsModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_TERMS_MODAL':
            return true
        case 'HIDE_TERMS_MODAL':
            return false
        default:
            return state
    }
}

export default termsModalVisibleReducer