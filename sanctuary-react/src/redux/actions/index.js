export const updateShoe = shoe => {
    return {
        type: 'UPDATE_SHOE',
        payload: shoe
    }
}

export const apiCall = data => {
    return {
        type: 'API_CALL',
        payload: data
    }
}

export const updateFilter = filter => {
    return {
        type: 'UPDATE_FILTER',
        payload: filter
    }
}

export const toggleShoeDetails = () => {
    return {
        type: 'TOGGLE_SHOE_DETAILS'
    }
}