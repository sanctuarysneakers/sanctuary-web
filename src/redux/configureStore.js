import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import globalReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['currency', 'location', 'size', 'user']
}

const persistedReducer = persistReducer(persistConfig, globalReducer)

export default () => {
	const store = createStore(persistedReducer)
	const persistor = persistStore(store)
	return { store, persistor }
}
