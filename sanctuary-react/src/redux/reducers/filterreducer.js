let initState = {
    search: '',
    size: 0,
    price_low: 0,
    price_high: 0,
    site: ""
}

const filterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH':
            return { ...state, search: action.payload }
        case 'UPDATE_SIZE_FILTER':
            return { ...state, size: action.payload }
        case 'UPDATE_PRICE_LOW_FILTER':
            return { ...state, price_low: action.payload }
        case 'UPDATE_PRICE_HIGH_FILTER':
            return { ...state, price_high: action.payload }
        case "CLEAR_FILTER":
            return initState
        default:
            return state
    }
}

export default filterReducer