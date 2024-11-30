import React from 'react';
import { AppNavigator } from './navigation';
import { Provider } from 'react-redux';
import store from './storage/store';

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
