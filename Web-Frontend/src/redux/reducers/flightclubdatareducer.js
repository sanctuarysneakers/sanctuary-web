const flightClubDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FLIGHTCLUB_CALL':
            return action.payload
        default:
            return state
    }
}

export default flightClubDataReducer