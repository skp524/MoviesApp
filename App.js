import React from 'react';
import AppRouter from './src/nav/Navigation';
import 'react-native-gesture-handler';
import { Provider } from 'mobx-react';
import store from './src/stores/Store';

const App = () => {
  return (
    <Provider {...store}>
      <AppRouter />
    </Provider>
  )
}
export default App;