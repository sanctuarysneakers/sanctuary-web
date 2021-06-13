import { combineReducers } from 'redux'
import browseDataReducer from './browsedatareducer'
import itemDataReducer from './itemdatareducer'
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
    itemData: itemDataReducer,
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