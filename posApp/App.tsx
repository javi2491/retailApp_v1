/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppContainer from './src/navigation/AppNavigation';
import configureStore from './src/redux/store';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    );
  }
}
