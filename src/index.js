import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './containers/App';
import './styles/main.scss';

let store = createStore(() => {});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
