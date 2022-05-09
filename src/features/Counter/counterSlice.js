import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {
		increase(state, action) {
			return state + 1;
		},

		decrease(state, action) {
			return state - 1;
		},
	},
});

const { actions, reducer } = counterSlice;
// Named export
export const { increase, decrease } = actions;
// Default export
export default reducer;
