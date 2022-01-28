import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    cartTotalQuantity: 0,
    cartTotalAmount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          itemQty: state.cartItems[existingIndex].itemQty + 1
        };

        toast.info('Increased product quantity', {
          position: 'bottom-left'
        });
      } else if (action.payload) {
        state.cartItems.push({ ...action.payload, itemQty: 1 });

        toast.success('Product added to cart', {
          position: 'bottom-left'
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (state.cartItems[itemIndex].itemQty > 1) {
        state.cartItems[itemIndex].itemQty -= 1;

        toast.info('Decreased product quantity', {
          position: 'bottom-left'
        });
      } else if (state.cartItems[itemIndex].itemQty === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error('Product removed from cart', {
          position: 'bottom-left'
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    getTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const currIndex = action.payload;
          const amount = cartItem.prices[currIndex]?.amount;
          const itemQty = cartItem.itemQty;
          const itemTotal = amount * itemQty;

          cartTotal.total += itemTotal;
          cartTotal.quantity += itemQty;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  }
});

export const { addToCart, decreaseCart, getTotal } = cartSlice.actions;
export default cartSlice.reducer;
