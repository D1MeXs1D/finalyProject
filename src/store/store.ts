import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import requestForAPI from './sliceAuthorization';
import toggleStateWindow from './windowForBurgerMenu';
import  valueToggleState from './headerLimitSlice';

const rootReducer = combineReducers({
  request: requestForAPI,
  burgerMenuWindow: toggleStateWindow,
  limitCompany: valueToggleState,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['burgerMenuWindow'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
export default store;



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch