import { combineReducers } from 'redux'
import browseDataReducer from './browsedatareducer'
import itemReducer from './itemreducer'
import itemKeyReducer from './itemkeyreducer'
import filterReducer from './filterreducer'
import currencyReducer from './currencyreducer'
import aboutModalVisibleReducer from './aboutmodalvisiblereducer'
import searchBarCollapseReducer from './searchBarCollapseReducer'
import newSearchHappenedReducer from './newsearchhappenedreducer'
import recordSplashHeightReducer from './recordsplashheightreducer'
import filterModalVisibleReducer from './filtermodalvisiblereducer'
import hamburgerModalVisibleReducer from './hamburgermodalvisiblereducer'
import userReducer from './userreducer'
import deleteModalVisibleReducer from './deletemodalvisiblereducer'
import searchBarVisibleReducer from './searchbarvisiblereducer'

const globalReducer = combineReducers({
    browseData: browseDataReducer,
    aboutModalVisible: aboutModalVisibleReducer,
    filter: filterReducer,
    currency : currencyReducer,
    item: itemReducer,
    itemKey: itemKeyReducer,
    searchBarVisible: searchBarVisibleReducer,
    isSearchBarCollapsed: searchBarCollapseReducer,
    newSearchHappened: newSearchHappenedReducer,
    splashHeight: recordSplashHeightReducer,
    filterModalVisible: filterModalVisibleReducer,
    hamburgerModalVisible: hamburgerModalVisibleReducer,
    user: userReducer,
    deleteModalVisible: deleteModalVisibleReducer,
})

export default globalReducer