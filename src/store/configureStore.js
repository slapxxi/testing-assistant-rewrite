// @flow
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

function configureStore() {
  const persistConfig = {
    storage,
    key: 'root',
    blacklist: ['databases'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
