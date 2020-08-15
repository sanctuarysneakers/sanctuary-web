export const updateShoe = shoe => {
    return {
        type: 'UPDATE_SHOE',
        payload: shoe
    }
}

// API Call Actions

export const stockxCall = data => {
    return {
        type: 'STOCKX_CALL',
        payload: data
    }
}

export const goatCall = data => {
    return {
        type: 'GOAT_CALL',
        payload: data
    }
}

export const grailedCall = data => {
    return {
        type: 'GRAILED_CALL',
        payload: data
    }
}

export const flightClubCall = data => {
    return {
        type: 'FLIGHTCLUB_CALL',
        payload: data
    }
}

// Filter Acitons

export const updateSearch = search => {
    return {
        type: 'UPDATE_SEARCH',
        payload: search
    }
}

export const updateSizeFilter = size => {
    return {
        type: 'UPDATE_SIZE_FILTER',
        payload: size
    }
}

export const updatePriceLowFilter = price_low => {
    return {
        type: 'UPDATE_PRICE_LOW_FILTER',
        payload: price_low
    }
}

export const updatePriceHighFilter = price_high => {
    return {
        type: 'UPDATE_PRICE_HIGH_FILTER',
        payload: price_high
    }
}

export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER'
    }
}

// Modal Actions

export const showShoeModal = () => {
    return {
        type: 'SHOW_SHOE_MODAL'
    }
}

export const hideShoeModal = () => {
    return {
        type: 'HIDE_SHOE_MODAL'
    }
}

export const showAboutModal = () => {
    return {
        type: 'SHOW_ABOUT_MODAL'
    }
}

export const hideAboutModal = () => {
    return {
        type: 'HIDE_ABOUT_MODAL'
    }
}

