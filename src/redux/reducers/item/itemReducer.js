import { combineReducers } from 'redux' 

const itemInfoReducer = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_INFO':
            return action.payload
        default:
            return state
    }
}

const itemListingsReducer = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_LISTINGS':
            return action.payload
        default:
            return state
    }
}

const itemPricesReducer = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_ITEM_PRICES':
            return action.payload
        default:
            return state
    }
}

const relatedItemsReducer = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_RELATED_ITEMS':
            return action.payload
        default:
            return state
    }
} 

const loadingItemListingsReducer = (state=true, action) => {
    switch(action.type) {
        case 'LOADING_ITEM_LISTINGS':
            return action.payload
        default:
            return state
    }
}

const loadingItemPricesReducer = (state=true, action) => {
    switch(action.type) {
        case 'LOADING_ITEM_PRICES':
            return action.payload
        default:
            return state
    }
}

const loadingRelatedItemsReducer = (state=true, action) => {
    switch(action.type) {
        case 'LOADING_RELATED_ITEMS':
            return action.payload
        default:
            return state
    }
}

const item = combineReducers({
    itemInfo: itemInfoReducer,
    itemPrices: itemPricesReducer,
    itemListings: itemListingsReducer,
    relatedItems: relatedItemsReducer,
    loadingItemPrices: loadingItemPricesReducer,
    loadingItemListings: loadingItemListingsReducer,
    loadingRelatedItems: loadingRelatedItemsReducer
})

export default item