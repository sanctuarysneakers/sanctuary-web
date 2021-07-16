const deleteModalVisibleReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_DELETE_MODAL':
            return true
        case 'HIDE_DELETE_MODAL':
            return false
        default:
            return state
    }
}

export default deleteModalVisibleReducer