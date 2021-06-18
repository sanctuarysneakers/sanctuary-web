
// Data Actions

export const browseCall = data => {
    return {
        type: 'BROWSE_CALL',
        payload: data
    }
}

export const updateItemData = itemData => {
    return {
        type: 'UPDATE_ITEM_DATA',
        payload: itemData
    }
}

// Filter Actions

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

// User Account Actions

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

// Modal Actions

export const showFilter = () => {
    return {
        type: 'SHOW_FILTER'
    }
}

export const hideFilter = () => {
    return {
        type: 'HIDE_FILTER'
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

// Global Values

export const recordSplashHeight = splashHeight => {
    return {
        type: 'RECORD_SPLASH_HEIGHT',
        payload: splashHeight
    }
}

// Location action

export const updateLocation = json => {
    return {
        type: 'UPDATE_LOCATION',
        payload: json
    }
}

// Update size 

export const updateSize = size => {
    return {
        type: 'UPDATE_SIZE',
        payload: size
    }
}

// Update sneaker list

export const updateSneakers = sneakers => {
    return {
        type: 'GET_SNEAKERS',
        payload: sneakers
    }
}