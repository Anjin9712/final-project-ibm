import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name,
      );
    },
    updateQuantity: (state, action) => {
      const { item, amount } = action.payload;
      const index = state.items.indexOf(
        state.items.find((i) => i.name === item.name),
      );
      if (item.quantity > 1) {
        state.items[index].quantity += amount;
      } else if (item.quantity === 1 && amount > 0) {
        state.items[index].quantity += amount;
      } else {
        return;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
