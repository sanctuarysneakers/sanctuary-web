import { combineReducers } from 'redux'

const brandReducer = (state=null, action) => {
    switch(action.type) {
        case 'UPDATE_BROWSE_BRAND':
            return action.payload
        default:
            return state
    }
}

const sortReducer = (state=null, action) => {
    switch(action.type) {
        case 'UPDATE_BROWSE_SORT':
            return action.payload
        default:
            return state
    }
}

const priceRangeReducer = (state=null, action) => {
    switch(action.type) {
        case 'UPDATE_BROWSE_PRICE_RANGES':
            return action.payload
        default:
            return state
    }
}

const sizeTypeReducer = (state=null, action) => {
    switch(action.type) {
        case 'UPDATE_BROWSE_SIZE_TYPES':
            return action.payload
        default:
            return state
    }
}

const releaseYearReducer = (state=null, action) => {
    switch(action.type) {
        case 'UPDATE_BROWSE_RELEASE_YEARS':
            return action.payload
        default:
            return state
    }
}

const browseFilters = combineReducers({
    brand: brandReducer, 
    sort: sortReducer, 
    priceRanges: priceRangeReducer, 
    sizeTypes: sizeTypeReducer, 
    releaseYears: releaseYearReducer
})

export default browseFilters