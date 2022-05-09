import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

// First, create the thunk
export const register = createAsyncThunk('users/fetchByIdStatus', async (payload) => {
	// Call Api Register
	const data = await userApi.register(payload);

	// Save data to local Storage
	localStorage.setItem(StorageKeys.TOKEN, data.jwt);
	localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

	// Return user data
	return data.user;
});

export const login = createAsyncThunk('users/fetchByIdStatus', async (payload) => {
	// Call Api Register
	const data = await userApi.login(payload);

	// Save data to local Storage
	localStorage.setItem(StorageKeys.TOKEN, data.jwt);
	localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

	// Return user data
	return data.user;
});

const userSlice = createSlice({
	name: 'user',
	initialState: {
		current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
		settings: {},
	},
	reducers: {
		logout(state) {
			// Clear local storage
			localStorage.removeItem(StorageKeys.USER);
			localStorage.removeItem(StorageKeys.TOKEN);

			state.current = {};
		},
	},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.current = action.payload;
		},

		[login.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
	},
});

const { actions, reducer } = userSlice;
// Default export
export const { logout } = actions;
export default reducer;
