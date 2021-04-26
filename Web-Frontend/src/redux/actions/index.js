export const updateShoe = shoe => {
    return {
        type: 'UPDATE_SHOE',
        payload: shoe
    }
}

// API Call Actions

export const browseCall = data => {
    return {
        type: 'BROWSE_CALL',
        payload: data
    }
}

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

export const shoeComparisonCall = data => {
    return {
        type: 'SHOE_COMPARISON_CALL',
        payload: data
    }
}

// Filter Actions

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

// Currency change

export const updateCurrency = currency => {
    return {
        type: 'UPDATE_CURRENCY',
        payload: currency
    }
}

// Modal Actions

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

export const showFilterModal = () => {
    return {
        type: 'SHOW_FILTER_MODAL'
    }
}

export const hideFilterModal = () => {
    return {
        type: 'HIDE_FILTER_MODAL'
    }
}

export const showHamburgerModal = () => {
    return {
        type: 'SHOW_HAMBURGER_MODAL'
    }
}

export const hideHamburgerModal = () => {
    return {
        type: 'HIDE_HAMBURGER_MODAL'
    }
}

export const showDeleteModal = () => {
    return {
        type: 'SHOW_DELETE_MODAL'
    }
}

export const hideDeleteModal = () => {
    return {
        type: 'HIDE_DELETE_MODAL'
    }
}

// Search Bar Collapse/Expand on mobile

export const collapseBar = () => {
    return {
        type: 'COLLAPSE_BAR'
    }
}

export const expandBar = () => {
    return {
        type: 'EXPAND_BAR'
    }
}

// Search Bar visible/disable per page

export const showHomeSeach = () => {
    return {
        type: 'SHOW_HOME_SEARCH'
    }
}

export const hideHomeSearch = () => {
    return {
        type: 'HIDE_HOME_SEARCH'
    }
}

// Callback Triggers

export const newSearchHappened = () => {
    return {
        type: 'NEW_SEARCH_HAPPENED'
    }
}

// Global Values

export const recordSplashHeight = splashHeight => {
    return {
        type: 'RECORD_SPLASH_HEIGHT',
        payload: splashHeight
    }
}

// Account 

export const setUser = user => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    }
}
