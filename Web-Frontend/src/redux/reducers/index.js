import shoeReducer from './shoereducer'
import stockxDataReducer from './stockxdatareducer'
import goatDataReducer from './goatdatareducer'
import grailedDataReducer from './graileddatareducer'
import flightClubDataReducer from './flightclubdatareducer'
import filterReducer from './filterreducer'
import currencyReducer from './currencyreducer'
import shoeModalVisibleReducer from './shoemodalvisiblereducer'
import aboutModalVisibleReducer from './aboutmodalvisiblereducer'
import searchBarCollapseReducer from './searchBarCollapseReducer'
import shoeComparisonDataReducer from './shoecomparisondatareducer'
import newSearchHappenedReducer from './newsearchhappenedreducer'
import recordSplashHeightReducer from './recordsplashheightreducer'
import { combineReducers } from 'redux'
import filterModalVisibleReducer from './filtermodalvisiblereducer'
import hamburgerModalVisibleReducer from './hamburgermodalvisiblereducer'
import userReducer from './userreducer'
import deleteModalVisibleReducer from './deletemodalvisiblereducer'
import homeSearchVisibleReducer from './homesearchvisiblereducer'

const globalReducer = combineReducers({
    shoeModalVisible: shoeModalVisibleReducer,
    aboutModalVisible: aboutModalVisibleReducer,
    filter: filterReducer,
    currency : currencyReducer,
    shoe: shoeReducer,
    stockxData: stockxDataReducer,
    goatData: goatDataReducer,
    grailedData: grailedDataReducer,
    flightClubData: flightClubDataReducer,
    isSearchBarCollapsed: searchBarCollapseReducer,
    shoeComparisonData: shoeComparisonDataReducer,
    newSearchHappened: newSearchHappenedReducer,
    splashHeight: recordSplashHeightReducer,
    filterModalVisible: filterModalVisibleReducer,
    hamburgerModalVisible: hamburgerModalVisibleReducer,
    user: userReducer,
    deleteModalVisible: deleteModalVisibleReducer,
    homeSearchVisible: homeSearchVisibleReducer
})

export default globalReducer