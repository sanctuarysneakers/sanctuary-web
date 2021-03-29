const uuidReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_UUID':
            return action.payload
        case 'CLEAR_UUID':
            return ''
        default:
            return state
    }
}

export default uuidReducer