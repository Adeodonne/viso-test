import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/storage/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
