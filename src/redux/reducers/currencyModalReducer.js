const currencyModalReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_CURRENCY_MODAL':
            return true
        case 'HIDE_CURRENCY_MODAL':
            return false
        default:
            return state
    }
}

export default currencyModalReducer