/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';


// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['status'],
};

const reducer = persistCombineReducers(config, reducers);

const middleware = [thunk];


<<<<<<< HEAD
  const store = createStore(
    reducer,
    composeWithDevTools(composeEnhancer(applyMiddleware(...middleware))),
  );
=======
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
>>>>>>> a7ee5e78b6cad0a0eecfa232d99bbe41faaa809b

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(...middleware)),
);

const persistor = persistStore(
  store,
  null,
  () => { store.getState(); },
);

export { store, persistor };
