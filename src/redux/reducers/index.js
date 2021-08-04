import { combineReducers } from 'redux'
import browseDataReducer from './browseDataReducer'
import itemInfoReducer from './itemInfoReducer'
import itemPricesReducer from './itemPricesReducer'
import itemListingsReducer from './itemListingsReducer'
import loadingItemPricesReducer from './loadingItemPricesReducer'
import loadingItemListingsReducer from './loadingItemListingsReducer'
import filterReducer from './filterReducer'
import currencyReducer from './currencyReducer'
import aboutModalVisibleReducer from './aboutModalVisibleReducer'
import recordSplashHeightReducer from './recordSplashHeightReducer'
import hamburgerModalVisibleReducer from './hamburgerModalVisibleReducer'
import userReducer from './userReducer'
import deleteModalVisibleReducer from './deleteModalVisibleReducer'
import locationReducer from './locationReducer'
import showfilterreducer from './showFilterReducer'
import sizeReducer from './sizeReducer'
import searchModalReducer from './searchModalReducer'
import locationPopupReducer  from './locationPopupReducer'

const globalReducer = combineReducers({
    size: sizeReducer,
    browseData: browseDataReducer,
    aboutModalVisible: aboutModalVisibleReducer,
    filter: filterReducer,
    currency : currencyReducer,
    itemInfo: itemInfoReducer,
    itemPrices: itemPricesReducer,
    itemListings: itemListingsReducer,
    loadingItemPrices: loadingItemPricesReducer,
    loadingItemListings: loadingItemListingsReducer,
    splashHeight: recordSplashHeightReducer,
    hamburgerModalVisible: hamburgerModalVisibleReducer,
    user: userReducer,
    deleteModalVisible: deleteModalVisibleReducer,
    location: locationReducer,
    filterVisible: showfilterreducer,
    searchModalVisible: searchModalReducer,
    locationPopup: locationPopupReducer
})

export default globalReducer