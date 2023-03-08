
// Data Actions

export const browseCall = data => {
    return {
        type: 'BROWSE_CALL',
        payload: data
    }
}

export const trendingCall = data => {
    return {
        type: 'TRENDING_CALL',
        payload: data
    }
}

export const under200Call = data => {
    return {
        type: 'UNDER_200_CALL',
        payload: data
    }
}

export const under300Call = data => {
    return {
        type: 'UNDER_300_CALL',
        payload: data
    }
}

export const updateItemInfo = itemInfo => {
    return {
        type: 'UPDATE_ITEM_INFO',
        payload: itemInfo
    }
}

export const updateItemPrices = itemPrices => {
    return {
        type: 'UPDATE_ITEM_PRICES',
        payload: itemPrices
    }
}

export const updateItemListings = itemListings => {
    return {
        type: 'UPDATE_ITEM_LISTINGS',
        payload: itemListings
    }
}

export const updateRelatedItems = relatedItems => {
    return {
        type: 'UPDATE_RELATED_ITEMS',
        payload: relatedItems
    }
}

export const setItemPricesLoading = isLoading => {
    return {
        type: 'LOADING_ITEM_PRICES',
        payload: isLoading
    }
}

export const setItemListingsLoading = isLoading => {
    return {
        type: 'LOADING_ITEM_LISTINGS',
        payload: isLoading
    }
}

export const setRelatedItemsLoading = isLoading => {
    return {
        type: 'LOADING_RELATED_ITEMS',
        payload: isLoading
    }
}

export const updatePortfolioData = portfolioData => {
    return {
        type: 'UPDATE_PORTFOLIO_DATA',
        payload: portfolioData
    }
}

export const setPortfolioLoading = isLoading => {
    return {
        type: 'LOADING_PORTFOLIO',
        payload: isLoading
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

export const showSearchModal = () => {
    return {
        type: 'SHOW_SEARCH_MODAL'
    }
}

export const hideSearchModal = () => {
    return {
        type: 'HIDE_SEARCH_MODAL'
    }
}

export const showCategoryFilterModal = () => {
    return {
        type: 'SHOW_CATEGORY_FILTER_MODAL'
    }
}

export const hideCategoryFilterModal = () => {
    return {
        type: 'HIDE_CATEGORY_FILTER_MODAL'
    }
}

export const showSizeModal = () => {
    return {
        type: 'SHOW_SIZE_MODAL'
    }
}

export const hideSizeModal = () => {
    return {
        type: 'HIDE_SIZE_MODAL'
    }
}

export const showCurrencyModal = () => {
    return {
        type: 'SHOW_CURRENCY_MODAL'
    }
}

export const hideCurrencyModal = () => {
    return {
        type: 'HIDE_CURRENCY_MODAL'
    }
}

export const showSocialsModal = () => {
    return {
        type: 'SHOW_SOCIALS_MODAL'
    }
}

export const hideSocialsModal = () => {
    return {
        type: 'HIDE_SOCIALS_MODAL'
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

export const showLocationPopup = data => {
    return {
        type: 'SHOW_LOCATION_POPUP',
        payload: data
    }
}

export const hideLocationPopup = () => {
    return {
        type: 'HIDE_LOCATION_POPUP'
    }
}

// Update size 

export const updateSize = size => {
    return {
        type: 'UPDATE_SIZE',
        payload: size
    }
}

// Redirect action (mobile auth)

export const setRedirectUrl = url => {
    return {
        type: 'SET_REDIRECT_URL',
        payload: url
    }
}