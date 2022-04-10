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

const browse = combineReducers({
    browseData: browseDataReducer, 
    trending: trendingReducer,   
    under200: under200Reducer,
    under300: under300Reducer,
})

export default browse 

