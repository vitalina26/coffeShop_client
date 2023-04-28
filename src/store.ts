import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import coffeReducer from './slices/coffe-slice';
import coffesReducer from './slices/coffes-slice';
export const store = configureStore({
   reducer: {
    auth: authReducer,
    coffes: coffesReducer,
    coffe: coffeReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


