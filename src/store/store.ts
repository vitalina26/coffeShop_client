import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import coffeReducer from './slices/coffe-slice';
import coffesReducer from './slices/coffe-items-slice';
import ordersReducer from './slices/orders-slice';
import cartReducer from './slices/cart-slice/cart-slice';
export const store = configureStore({
   reducer: {
    auth: authReducer,
    coffes: coffesReducer,
    coffe: coffeReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


