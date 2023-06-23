// Data Actions

export const browseCall = data => {
  return {
    type: 'BROWSE_CALL',
    payload: data
  }
}

export const updateFeaturedCollections = collections => {
  return {
    type: 'UPDATE_FEATURED_COLLECTIONS',
    payload: collections
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

// Browse Filter Actions

export const toggleBrowseBrand = brand => {
  return {
    type: 'TOGGLE_BROWSE_BRAND',
    payload: brand
  }
}

export const updateBrowseGender = gender => {
  return {
    type: 'UPDATE_BROWSE_GENDER',
    payload: gender
  }
}

export const updateBrowseSort = sortBy => {
  return {
    type: 'UPDATE_BROWSE_SORT',
    payload: sortBy
  }
}

export const resetFilters = () => {
  return {
    type: 'RESET_FILTERS'
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

export const showFiltersModal = () => {
  return {
    type: 'SHOW_FILTERS_MODAL'
  }
}

export const hideFiltersModal = () => {
  return {
    type: 'HIDE_FILTERS_MODAL'
  }
}

export const showSortByModal = () => {
  return {
    type: 'SHOW_SORT_BY_MODAL'
  }
}

export const hideSortByModal = () => {
  return {
    type: 'HIDE_SORT_BY_MODAL'
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
