import { combineReducers } from 'redux'

//individual reducer 
import currencyReducer from './currencyReducer'
import recordSplashHeightReducer from './recordSplashHeightReducer'
import userReducer from './userReducer'
import locationReducer from './locationReducer'

//grouped reducers
import browseReducer from './browse/browseReducer'
import itemReducer from './item/itemReducer'
import modalReducer from './modals/modalReducer'
import portfolioReducer from './portfolio/portfolioReducer'

const globalReducer = combineReducers({

    currency : currencyReducer,
    location: locationReducer,
    splashHeight: recordSplashHeightReducer,
    user: userReducer,     
    
    item: itemReducer, 
    modals: modalReducer,
    browse: browseReducer, 
    portfolio: portfolioReducer
})

export default globalReducer