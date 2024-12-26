import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice += action.payload.totalPrice;
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    clearCart: (state) => {
      state.length = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateCartItem: (state, action) => {
      const { productId, quantity, price } = action.payload;
      const existingItem = state.find((item) => item.id === productId);

      if (existingItem) {
        if (quantity > 0 && price > 0) {
          existingItem.quantity = quantity;
          existingItem.totalPrice = quantity * price;
        }
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
