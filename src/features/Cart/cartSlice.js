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
	},
});

const { actions, reducer } = cartSlice;
// Named export
export const { showMiniCart, hideMiniCart } = actions;
// Default export
export default reducer;
