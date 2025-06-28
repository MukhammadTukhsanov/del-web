import { getMerchantsService } from '@/services/merchant.services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMerchants = createAsyncThunk('merchants/list', async () => {
  try {
    const response = await getMerchantsService();
    return response;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
});
  
const merchantsSlice = createSlice({
  name: 'merchants',
  initialState: {
    merchants: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMerchants.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getMerchants.fulfilled,
        (state, action) => {
          state.loading = false;
          state.merchants = action.payload;
        }
      )
      .addCase(
        getMerchants.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch merchants';
        }
      );
  },
});

export default merchantsSlice.reducer;

  