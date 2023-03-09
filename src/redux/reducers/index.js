import { combineReducers } from 'redux'

//individual reducers
import sizeReducer from './sizeReducer'
import currencyReducer from './currencyReducer'
import recordSplashHeightReducer from './recordSplashHeightReducer'
import userReducer from './userReducer'
import locationReducer from './locationReducer'
import redirectReducer from './redirectReducer'

//grouped reducers
import browseReducer from './browse/browseReducer'
import itemReducer from './item/itemReducer'
import modalReducer from './modals/modalReducer'
import portfolioReducer from './portfolio/portfolioReducer'

const globalReducer = combineReducers({
    size: sizeReducer,
    currency: currencyReducer,
    location: locationReducer,
    splashHeight: recordSplashHeightReducer,
    user: userReducer,
    redirect: redirectReducer,
    
    item: itemReducer, 
    modals: modalReducer,
    browse: browseReducer, 
    portfolio: portfolioReducer
})

export default globalReducer