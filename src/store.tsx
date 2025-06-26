import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'

export interface IStore {
  auth: {
    user: string | null
    token: string | null
    loading: boolean
    error: string | null
  }
}

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})