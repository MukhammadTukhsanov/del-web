import { otpSendService, verifyOtpService } from '@/services/auth.services';
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

const otpSlice = createSlice({
  name: 'auth',
  initialState: {
    phone: null as string | null,
    token: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        localStorage.setItem('auth_token', action.payload.token);
        state.error = null;
      })
      .addCase(veirifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = 'OTP confirmation failed';
      });
  },
});

export const {} = otpSlice.actions;
export default otpSlice.reducer;
