import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/auth/userSlice'
import otpReducer from './features/auth/otpSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    otp: otpReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch