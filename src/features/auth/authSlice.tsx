// authSlice.js
import { getCurrentUserService, otpSendService, refreshTokenService, verifyOtpService } from '@/services/auth.services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const otpSend = createAsyncThunk('auth/otpSend', async ({ phone }: { phone: string }) => {
  try {
    await otpSendService(phone);
    return {
      phone,
    };
  } catch (error) {
    throw new Error('Login failed');
  }
});

export const veirifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const response = await verifyOtpService(phone, otp);
      return response;
    } catch (error) {
      throw new Error('OTP confirmation failed');
    }
  },
);

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
    throw new Error('Failed to fetch current user');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    phone: null as string | null,
    user: null,
    token: null,
    tokenLoading: true,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.tokenLoading = false;
      state.error = null;
      state.phone = null;
    },
    clearPhone(state) {
      state.phone = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.tokenLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.tokenLoading = false;
        state.token = action.payload.token;
        localStorage.setItem('auth_token', action.payload.token);
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.tokenLoading = false;
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
        state.error = 'Failed to fetch current user';
        state.user = null;
        state.token = null;
        localStorage.removeItem('auth_token');
      })

      .addCase(otpSend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpSend.fulfilled, (state, action) => {
        state.loading = false;
        state.phone = action.payload.phone;
      })
      .addCase(otpSend.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Login failed';
      })

      .addCase(veirifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(veirifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(veirifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = 'OTP confirmation failed';
      });
  },
});

export const { logout, clearPhone } = authSlice.actions;
export default authSlice.reducer;
