import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './features/auth/otpSlice';
import userReducer from './features/auth/userSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    otp: otpReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
