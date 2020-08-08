let initState = {
    search: '',
    size: 0,
    price: 0,
    site: ""
}

const filterReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_FILTER':
            return action.payload
        default:
            return state
    }
}

export default filterReducer