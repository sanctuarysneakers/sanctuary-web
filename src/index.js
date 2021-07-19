import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import globalReducer from './redux/reducers'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Loader from './components/loader';
import './assets/styling/base.scss'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    whitelist: ['size', 'currency', 'user', 'location']
}

const persistedReducer = persistReducer(persistConfig, globalReducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <App/>
            </PersistGate>
        </Router>
    </Provider>,
    document.getElementById('root')
)
