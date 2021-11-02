import { combineReducers } from 'redux'
import browseDataReducer from './browseDataReducer'
import trendingReducer from './trendingReducer'
import under200Reducer from './under200Reducer'
import under300Reducer from './under300Reducer'
import itemInfoReducer from './itemInfoReducer'
import itemPricesReducer from './itemPricesReducer'
import itemListingsReducer from './itemListingsReducer'
import loadingItemPricesReducer from './loadingItemPricesReducer'
import loadingItemListingsReducer from './loadingItemListingsReducer'
import filterReducer from './filterReducer'
import currencyReducer from './currencyReducer'
import rateReducer from './rateReducer'
import aboutModalVisibleReducer from './aboutModalVisibleReducer'
import recordSplashHeightReducer from './recordSplashHeightReducer'
import hamburgerModalVisibleReducer from './hamburgerModalVisibleReducer'
import userReducer from './userReducer'
import deleteModalVisibleReducer from './deleteModalVisibleReducer'
import locationReducer from './locationReducer'
import showfilterreducer from './showFilterReducer'
import sizeReducer from './sizeReducer'
import searchModalReducer from './searchModalReducer'
import locationPopupReducer  from './locationPopupReducer'
import sizeModalReducer from './sizeModalReducer'
import currencyModalReducer from './currencyModalReducer'
import categoryFilterModalReducer from './categoryFilterReducer'

const globalReducer = combineReducers({
    size: sizeReducer,
    browseData: browseDataReducer,
    trending: trendingReducer,
    under200: under200Reducer,
    under300: under300Reducer,
    aboutModalVisible: aboutModalVisibleReducer,
    filter: filterReducer,
    currency : currencyReducer,
    rate: rateReducer,
    itemInfo: itemInfoReducer,
    itemPrices: itemPricesReducer,
    itemListings: itemListingsReducer,
    loadingItemPrices: loadingItemPricesReducer,
    loadingItemListings: loadingItemListingsReducer,
    splashHeight: recordSplashHeightReducer,
    hamburgerModalVisible: hamburgerModalVisibleReducer,
    user: userReducer,
    deleteModalVisible: deleteModalVisibleReducer,
    location: locationReducer,
    filterVisible: showfilterreducer,
    searchModalVisible: searchModalReducer,
    locationPopup: locationPopupReducer,
    sizeModalVisible: sizeModalReducer,
    currencyModalVisible: currencyModalReducer,
    categoryFilterModalVisible: categoryFilterModalReducer
})

export default globalReducer