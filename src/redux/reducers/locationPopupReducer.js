const locationPopupReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_LOCATION_POPUP':
            return action.payload
        case 'HIDE_LOCATION_POPUP':
            return false
        default:
            return state
    }
}

export default locationPopupReducer