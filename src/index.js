import { Auth0Provider } from '@auth0/auth0-react'
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
        <Auth0Provider
          domain="dev-yvh7dco46en8g2mq.us.auth0.com"
          clientId="LaMym7DUtn26Vl5JhEemlYOuVFp7edko"
          authorizationParams={{
            redirect_uri: 'https://sanctuarysneakers.com/'
          }}
        >
          <App/>
        </Auth0Provider>
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
)
