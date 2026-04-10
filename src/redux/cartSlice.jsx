import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  wishlist: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedSize, selectedColor, quantity, updateQuantity } = action.payload;
      
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        if (updateQuantity) {
          existingItem.quantity = quantity;
        } else {
          existingItem.quantity += quantity;
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor)
      );
    },
    toggleWishlist: (state, action) => {
      const index = state.wishlist.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, toggleWishlist, clearCart } = cartSlice.actions;
export default cartSlice.reducer;