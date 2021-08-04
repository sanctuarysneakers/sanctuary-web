
export const locationReducer = (state=null, action) => {
    switch(action.type) {
        case 'UPDATE_LOCATION':
            return action.payload
        default:
            return state
        
    }
}

export default locationReducer