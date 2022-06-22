import { combineReducers } from 'redux' 

const under200Reducer = (state=[], action) => {
    switch (action.type) {
        case 'UNDER_200_CALL':
            return action.payload
        default:
            return state
    }
}

const under300Reducer = (state=[], action) => {
    switch (action.type) {
        case 'UNDER_300_CALL':
            return action.payload
        default:
            return state
    }
}

const trendingReducer = (state=[], action) => {
    switch (action.type) {
        case 'TRENDING_CALL':
            return action.payload
        default:
            return state
    }
}

const browseDataReducer = (state=[], action) => {
    switch (action.type) {
        case 'BROWSE_CALL':
            return action.payload
        default:
            return state
    }
}

//filters

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

//used to reset all filters at once
const browseFiltersReducerWrapper = (state, action) => { 
    if (action.type === 'RESET_FILTERS') {
      state = undefined
    }
    return browseFilters(state, action)
}


const browse = combineReducers({
    browseData: browseDataReducer, 
    trending: trendingReducer,   
    under200: under200Reducer,
    under300: under300Reducer,
    filters: browseFiltersReducerWrapper, 
})

export default browse 

