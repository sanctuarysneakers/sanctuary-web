/* The current active shoe */

const shoeReducer = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_SHOE':
            return action.payload
        default:
            return state
    }
}

export default shoeReducer