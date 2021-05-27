export const locationReducer = (state = false, action) => {
    switch(action.type) {
        case 'UPDATE_LOCATION':
            return action.payload;
        default:
            return state;     
        
    }
}

export default locationReducer;