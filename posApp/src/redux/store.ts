import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import appStore from './reducers/AppStore';
import sessionStore from './reducers/SessionStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActionController} from './services/ActionController';
import {storeRehydrateFinish} from './actions/AppStore/Index';
import crashlytics from '@react-native-firebase/crashlytics';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [thunk, ActionController];

// if (process.env.NODE_ENV === `development`) {
//   const {logger} = require(`redux-logger`);

//   middlewares.push(logger);
// }

const handleRehydrateFinish = (myStore: any) => {
  myStore.dispatch(storeRehydrateFinish());
};

const appReducers = combineReducers({
  appStore,
  sessionStore,
});

export default function configureStore2() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, appReducers);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store, null, () =>
    handleRehydrateFinish(store),
  );

  return {store, persistor};
}
