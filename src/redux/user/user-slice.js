import { createSlice } from '@reduxjs/toolkit';

import {
	getUserData,
	updateUserData,
	addUserPet,
	removeUserPet,
} from './user-operations';

const initialState = {
	user: { avatarURL: null, userInfo: {} },
	loading: false,
	error: null,
	isLoadingUpdate: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: {
		[getUserData.pending]: store => {
			store.loading = true;
			store.error = null;
		},
		[getUserData.fulfilled]: (store, { payload }) => {
			store.loading = false;
			store.user = payload.user;
		},
		[getUserData.rejected]: (store, { payload }) => {
			store.loading = false;
			store.error = payload;
		},
		[updateUserData.pending]: store => {
			store.loading = true;
			store.error = null;
			store.isLoadingUpdate = true;
		},
		[updateUserData.fulfilled]: (store, { payload }) => {
			store.loading = false;
			store.user = { ...store.user, ...payload.user };
			store.isLoadingUpdate = false;
		},
		[updateUserData.rejected]: (store, { payload }) => {
			store.loading = false;
			store.error = payload;
			store.isLoadingUpdate = false;
		},
		[addUserPet.pending]: store => {
			store.loading = true;
			store.error = null;
		},
		[addUserPet.fulfilled]: (store, { payload }) => {
			store.loading = false;
			store.user.pets = [payload, ...store.user.pets];
		},
		[addUserPet.rejected]: (store, { payload }) => {
			store.loading = false;
			store.error = payload;
		},
		[removeUserPet.pending]: store => {
			store.loading = true;
			store.error = null;
		},
		[removeUserPet.fulfilled]: (store, { payload }) => {
			store.loading = false;
			store.user.pets = store.user.pets.filter(({ _id }) => _id !== payload.id);
		},
		[removeUserPet.rejected]: (store, { payload }) => {
			store.loading = false;
			store.error = payload;
		},
	},
});

export default userSlice.reducer;
