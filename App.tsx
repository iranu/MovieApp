/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ListScreen from './src/screens/ListScreen';
import { store } from './src/store';
import { Provider } from 'react-redux'

function App() {
    return (
      <Provider store={store}>
          <ListScreen />
      </Provider>
    );
}

export default App;
