import { getMerchantProductsService, getMerchantsService } from '@/services/merchant.services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMerchants = createAsyncThunk('merchants/list', async () => {
  try {
    const response = await getMerchantsService();
    return response;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
});

// export const getMerchantInformation = createAsyncThunk(
//   'merchant/information',
//   async (merchantId: string) => {
//     try {
//       const response = await getMerchantInformationService(merchantId);
//       return response;
//     } catch (error) {
//       console.log(error);
//       throw new Error('Failed to fetch merchant information');
//     }
//   },
// );
export const getMerchantProducts = createAsyncThunk(
  'merchants/products',
  async (merchantId: string) => {
    try {
      const response = await getMerchantProductsService(merchantId);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch merchant products');
    }
  },
);

const merchantsSlice = createSlice({
  name: 'merchants',
  initialState: {
    merchants: [] as any[],
    merchantInformation: null as any,
    products: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMerchants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMerchants.fulfilled, (state, action) => {
        state.loading = false;
        state.merchants = action.payload;
      })
      .addCase(getMerchants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch merchants';
      })
      // .addCase(getMerchantInformation.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getMerchantInformation.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.merchantInformation = action.payload;
      // })
      // .addCase(getMerchantInformation.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Failed to fetch merchant information';
      // })
      .addCase(getMerchantProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(getMerchantProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getMerchantProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch merchant products';
      });
  },
});

export default merchantsSlice.reducer;
