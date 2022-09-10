import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelect = (state) => state.cart.cartItems;

// Count  number of products in cart
export const cartItemsCountSelector = createSelector(cartItemsSelect, (cartItems) =>
	cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total of cart
export const cartTotalSelector = createSelector(cartItemsSelect, (cartItems) =>
	cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);
