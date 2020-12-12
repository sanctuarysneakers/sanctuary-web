import shoeReducer from './shoereducer'
import stockxDataReducer from './stockxdatareducer'
import goatDataReducer from './goatdatareducer'
import grailedDataReducer from './graileddatareducer'
import flightClubDataReducer from './flightclubdatareducer'
import filterReducer from './filterreducer'
import shoeModalVisibleReducer from './shoemodalvisiblereducer'
import aboutModalVisibleReducer from './aboutmodalvisiblereducer'
import termsModalVisibleReducer from './termsmodalvisiblereducer'
import privacyModalVisibleReducer from './privacymodalvisiblereducer'
import searchBarCollapseReducer from './searchBarCollapseReducer'
import shoeComparisonDataReducer from './shoecomparisondatareducer'
import newSearchHappenedReducer from './newsearchhappenedreducer'
import recordSplashHeightReducer from './recordsplashheightreducer'
import { combineReducers } from 'redux'

const globalReducer = combineReducers({
    shoeModalVisible: shoeModalVisibleReducer,
    aboutModalVisible: aboutModalVisibleReducer,
    termsModalVisible: termsModalVisibleReducer,
    privacyModalVisible: privacyModalVisibleReducer,
    filter: filterReducer,
    shoe: shoeReducer,
    stockxData: stockxDataReducer,
    goatData: goatDataReducer,
    grailedData: grailedDataReducer,
    flightClubData: flightClubDataReducer,
    isSearchBarCollapsed: searchBarCollapseReducer,
    shoeComparisonData: shoeComparisonDataReducer,
    newSearchHappened: newSearchHappenedReducer,
    splashHeight: recordSplashHeightReducer
})

export default globalReducer