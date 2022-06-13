import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';

// Import redux actions
import * as gigActions from './store/gig'
import * as categoryActions from './store/category'
import * as orderActions from './store/order'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store; //easy access to store and its methods in browser console
  window.gigActions = gigActions //test gig redux state
  window.categoryActions = categoryActions //test category redux state
  window.orderActions = orderActions //test order redux state
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
