import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  count: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.count;
  }, 0);

  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'count'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    updateCartItemCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      const { id, count } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (count <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.count = count;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
