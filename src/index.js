import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { PersistGate } from 'redux-persist/lib/integration/react'

import App from './App'
import Loader from './components/Other/loader'
import ScrollToTop from './components/Other/scrollToTop'
import './assets/styling/base.scss'

const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ScrollToTop />
        <App/>
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
)
