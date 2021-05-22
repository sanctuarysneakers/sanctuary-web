import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import "./assets/styling/base.scss";
import { createStore } from 'redux';
import globalReducer from './redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(globalReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
