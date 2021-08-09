const sizeModalReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_SIZE_MODAL':
            return true
        case 'HIDE_SIZE_MODAL':
            return false
        default:
            return state
    }
}

export default sizeModalReducer