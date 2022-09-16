/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  messages: any[];
  profile: null | { [key: string]: any[] | any };
  walletId: string;
};

const initialState: initialStateType = {
  messages: [],
  profile: null,
  walletId: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateMessages(state, action) {
      state.messages = action.payload;
    },
    updateReadMessage(state, action) {
      state.messages[action.payload.index] = action.payload.message;
    },
    updateUserProfile(state, action) {
      state.profile = action.payload;
    },
    updateWallet(state, action: PayloadAction<string>) {
      state.walletId = action.payload;
    },
  },
});

export const {
  updateMessages,
  updateReadMessage,
  updateUserProfile,
  updateWallet,
} = UserSlice.actions;
export default UserSlice.reducer;
