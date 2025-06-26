import { getCurrentUserService, refreshTokenService } from '@/services/auth.services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  try {
    const response = await refreshTokenService();
    return response;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  try {
    const response = await getCurrentUserService();
    return response;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
});

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as any,
    token: localStorage.getItem('auth_token') || null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('auth_token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('auth_token', action.payload.token);
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.error = 'Refresh token failed';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = 'Get current user failed';
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
