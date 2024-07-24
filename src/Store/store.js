import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './usedRedux/eventReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, eventReducer);

export const store = configureStore({
  reducer: {
    events: persistedReducer,
  },
});

export const persistor = persistStore(store);
