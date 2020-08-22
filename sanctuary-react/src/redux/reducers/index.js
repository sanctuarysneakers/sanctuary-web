import shoeReducer from './shoereducer'
import stockxDataReducer from './stockxdatareducer'
import goatDataReducer from './goatdatareducer'
import grailedDataReducer from './graileddatareducer'
import flightClubDataReducer from './flightclubdatareducer'
import filterReducer from './filterreducer'
import shoeModalVisibleReducer from './shoemodalvisiblereducer'
import aboutModalVisibleReducer from './aboutmodalvisiblereducer'
import searchBarCollapseReducer from './searchBarCollapseReducer'
import { combineReducers } from 'redux'

const globalReducer = combineReducers({
    shoeModalVisible: shoeModalVisibleReducer,
    aboutModalVisible: aboutModalVisibleReducer,
    filter: filterReducer,
    shoe: shoeReducer,
    stockxData: stockxDataReducer,
    goatData: goatDataReducer,
    grailedData: grailedDataReducer,
    flightClubData: flightClubDataReducer,
    isSearchBarCollapsed: searchBarCollapseReducer
})

export default globalReducer