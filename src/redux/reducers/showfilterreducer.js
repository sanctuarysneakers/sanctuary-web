const filterVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_FILTER':
            return true
        case 'HIDE_FILTER':
            return false
        default:
            return state
    }
}

export default filterVisibleReducer