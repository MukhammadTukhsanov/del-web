import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
declare const google: any;

export const getAddressFromLatLng = createAsyncThunk(
  'location/getAddressFromLatLng',
  async ({ lat, lng }: { lat: number; lng: number }) => {
    if (!google) {
      return Promise.reject(new Error("Google Maps API not loaded"));
    }

    const geocoder = new google.maps.Geocoder();
    const latLng = { lat: parseFloat(lat.toString()), lng: parseFloat(lng.toString()) };

    return new Promise<string>((resolve, reject) => {
      geocoder.geocode({ location: latLng }, (results: { formatted_address: string }[], status: string) => {
        if (status === "OK") {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject(new Error("No results found"));
          }
        } else {
          reject(new Error("Geocoder failed due to: " + status));
        }
      });
    });
  }
);

const locationsSlice = createSlice({
  name: 'location',
  initialState: {
    selection: null as { lat: number; lng: number; address: string; } | null,
    lat: null as number | null,
    lng: null as number | null,
    address: null as string | null,
  },
  reducers: {
    setLocation: (state, action) => {
      const { lat, lng, address } = action.payload;
      state.selection = { lat, lng, address };
    },
    updateAddress: (state, action) => {
      const { address } = action.payload;
      state.address = address;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAddressFromLatLng.pending, (state) => {
      state.lat = null;
      state.lng = null;
      state.address = null;
    })
    .addCase(getAddressFromLatLng.fulfilled, (state, action) => {
      state.lat = action.meta.arg.lat;
      state.lng = action.meta.arg.lng;
      state.address = action.payload;
    })
    .addCase(getAddressFromLatLng.rejected, (state, action) => {
      console.error("Error fetching address:", action.error.message);
      state.address = null;
    });
  },
});

export const { setLocation, updateAddress } = locationsSlice.actions;
export default locationsSlice.reducer;
