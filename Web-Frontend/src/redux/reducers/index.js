import { combineReducers } from 'redux'
import browseDataReducer from './browsedatareducer'
import itemInfoReducer from './itemInfoReducer'
import itemPricesReducer from './itemPricesReducer'
import itemListingsReducer from './itemListingsReducer'
import filterReducer from './filterreducer'
import currencyReducer from './currencyreducer'
import aboutModalVisibleReducer from './aboutmodalvisiblereducer'
import searchBarCollapseReducer from './searchBarCollapseReducer'
import recordSplashHeightReducer from './recordsplashheightreducer'
import filterModalVisibleReducer from './filtermodalvisiblereducer'
import hamburgerModalVisibleReducer from './hamburgermodalvisiblereducer'
import userReducer from './userreducer'
import deleteModalVisibleReducer from './deletemodalvisiblereducer'
import searchBarVisibleReducer from './searchbarvisiblereducer'
import locationReducer from './locationreducer'
import showfilterreducer from './showfilterreducer'
import updateSizeReducer from './updatesizereducer'

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
    filterVisible: showfilterreducer
})

export default globalReducer