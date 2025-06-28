import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './features/auth/otpSlice';
import userReducer from './features/auth/userSlice';
import cartReducer from './features/cart/cartSlice';
import merchantsReducer from './features/merchants/index'

export const store = configureStore({
  reducer: {
    user: userReducer,
    otp: otpReducer,
    cart: cartReducer,
    merchants: merchantsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
