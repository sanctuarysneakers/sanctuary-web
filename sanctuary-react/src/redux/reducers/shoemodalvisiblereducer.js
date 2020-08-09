const shoeModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_SHOE_MODAL':
            return true
        case 'HIDE_SHOE_MODAL':
            return false
        default:
            return state
    }
}

export default shoeModalVisibleReducer