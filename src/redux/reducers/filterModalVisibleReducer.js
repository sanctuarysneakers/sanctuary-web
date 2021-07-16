const filterModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_FILTER_MODAL':
            return true
        case 'HIDE_FILTER_MODAL':
            return false
        default:
            return state
    }
}

export default filterModalVisibleReducer