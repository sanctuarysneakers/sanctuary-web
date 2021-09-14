const categoryFilterModalReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_CATEGORY_FILTER_MODAL':
            return true
        case 'HIDE_CATEGORY_FILTER_MODAL':
            return false
        default:
            return state
    }
}

export default categoryFilterModalReducer