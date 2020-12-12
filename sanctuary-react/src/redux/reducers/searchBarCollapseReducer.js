const searchBarCollapseReducer = (state = true, action) => {
    switch(action.type) {
        case 'EXPAND_BAR':
            return false
        case 'COLLAPSE_BAR':
            return true
        default:
            return state
    }
}

export default searchBarCollapseReducer