
// Item Data Actions

export const updateItem = itemInfo => {
    return {
        type: 'UPDATE_ITEM',
        payload: itemInfo
    }
}

export const updateItemKey = itemKey => {
    return {
        type: 'UPDATE_ITEM_KEY',
        payload: itemKey
    }
}

export const updatePrices = prices => {
    return {
        type: 'UPDATE_PRICES',
        payload: prices
    }
}

export const updateItemListings = listings => {
    return {
        type: 'UPDATE_LISTINGS',
        payload: listings
    }
}

// API Call Actions

export const browseCall = data => {
    return {
        type: 'BROWSE_CALL',
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
