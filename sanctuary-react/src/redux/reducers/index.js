import shoeReducer from './shoereducer'
import apiDataReducer from './apidatareducer'
import filterReducer from './filterreducer'
import shoeModalVisibleReducer from './shoemodalvisiblereducer'
import { combineReducers } from 'redux'

const globalReducer = combineReducers({
    shoeModalVisible: shoeModalVisibleReducer,
    filter: filterReducer,
    apiData: apiDataReducer,
    shoe: shoeReducer
})

export default globalReducer