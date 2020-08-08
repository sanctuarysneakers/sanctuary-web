const shoeDetailsReducer = (state = false, action) => {
    switch(action.type) {
        case 'TOGGLE_SHOE_DETAILS':
            return true
        default:
            return state
    }
}

export default shoeDetailsReducer