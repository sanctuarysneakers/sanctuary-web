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