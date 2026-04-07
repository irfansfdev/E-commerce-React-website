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
          // If coming from Cart page: SET the exact number
          existingItem.quantity = quantity;
        } else {
          // If coming from Product page: ADD to the current number
          existingItem.quantity += quantity;
        }
      } else {
        // New item: Add to array
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
  },
});

export const { addToCart, removeFromCart, toggleWishlist } = cartSlice.actions;
export default cartSlice.reducer;