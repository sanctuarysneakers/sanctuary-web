import { combineReducers } from 'redux'
import browseDataReducer from './browseDataReducer'
import itemInfoReducer from './itemInfoReducer'
import itemPricesReducer from './itemPricesReducer'
import itemListingsReducer from './itemListingsReducer'
import filterReducer from './filterReducer'
import currencyReducer from './currencyReducer'
import aboutModalVisibleReducer from './aboutModalVisibleReducer'
import searchBarCollapseReducer from './searchBarCollapseReducer'
import recordSplashHeightReducer from './recordSplashHeightReducer'
import filterModalVisibleReducer from './filterModalVisibleReducer'
import hamburgerModalVisibleReducer from './hamburgerModalVisibleReducer'
import userReducer from './userReducer'
import deleteModalVisibleReducer from './deleteModalVisibleReducer'
import searchBarVisibleReducer from './searchBarVisibleReducer'
import locationReducer from './locationReducer'
import showfilterreducer from './showFilterReducer'
import updateSizeReducer from './updateSizeReducer'
import searchModalReducer from './searchModalReducer'

const globalReducer = combineReducers({
    size: updateSizeReducer,
    browseData: browseDataReducer,
    aboutModalVisible: aboutModalVisibleReducer,
    filter: filterReducer,
    currency : currencyReducer,
    itemInfo: itemInfoReducer,
    itemPrices: itemPricesReducer,
    itemListings: itemListingsReducer,
    searchBarVisible: searchBarVisibleReducer,
    isSearchBarCollapsed: searchBarCollapseReducer,
    splashHeight: recordSplashHeightReducer,
    filterModalVisible: filterModalVisibleReducer,
    hamburgerModalVisible: hamburgerModalVisibleReducer,
    user: userReducer,
    deleteModalVisible: deleteModalVisibleReducer,
    location: locationReducer,
    filterVisible: showfilterreducer,
    searchModalVisible: searchModalReducer
})

export default globalReducer