import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		showMiniCart: false,
		cartItems: [],
		// {
		//     id: productId,
		//     product: {},
		//     quantity: 1
		// }
	},
	reducers: {
		showMiniCart(state) {
			state.showMiniCart = true;
		},

		hideMiniCart(state) {
			state.showMiniCart = false;
		},

		addToCart(state, action) {
			// newItem = {id, quantity, product}
			const newItem = action.payload;
			const index = state.cartItems.findIndex((x) => x.id === newItem.id);

			if (index >= 0) {
				// Increase quantity
				state.cartItems[index].quantity += newItem.quantity;
			} else {
				// add to cart
				state.cartItems.push(newItem);
			}
		},

		setQuantity(state, action) {
			const { id, quantity } = action.payload;
			// Check if product is available in cart
			const index = state.cartItems.findIndex((x) => x.id === id);
			if (index >= 0) {
				state.cartItems[index].quantity = quantity;
			}
		},

		removeFormCart(state, action) {
			const IdNeedToRemove = action.payload;
			state.cartItems = state.cartItems.filter((x) => x.id !== IdNeedToRemove.id);
		},
	},
});

const { actions, reducer } = cartSlice;
// Named export
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFormCart } = actions;
// Default export
export default reducer;
