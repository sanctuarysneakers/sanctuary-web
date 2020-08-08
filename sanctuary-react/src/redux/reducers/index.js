import shoeReducer from './shoereducer'
import apiDataReducer from './apidatareducer'
import filterReducer from './filterreducer'
import shoeDetailsReducer from './shoedetailsreducer'
import { combineReducers } from 'redux'

const globalReducer = combineReducers({
    shoeDetails: shoeDetailsReducer,
    filter: filterReducer,
    apiData: apiDataReducer,
    shoe: shoeReducer
})

export default globalReducer