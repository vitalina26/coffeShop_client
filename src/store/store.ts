import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import coffeReducer from './slices/coffe-slice';
import coffesReducer from './slices/coffe-items-slice';
import ordersReducer from './slices/orders-slice';
import cartReducer from './slices/cart-slice/cart-slice';
//import storage from 'redux-persist/lib/storage';
//import thunk from 'redux-thunk';
/*import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const persistConfig = {
  key: 'root',
  storage,
}*/
//const persistedReducer = persistReducer(persistConfig, cartReducer)
export const store = configureStore({
   reducer: {
    auth: authReducer,
    coffes: coffesReducer,
    coffe: coffeReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
 /* middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),*/
  //middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


