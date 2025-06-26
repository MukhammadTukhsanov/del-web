// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Fake async login (replace with real API call)
export const login = createAsyncThunk(
  'auth/login',
  async ({ phoneNumber, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ username: 'admin', token: '123456' })
      }, 1000)
    })
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.username
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
