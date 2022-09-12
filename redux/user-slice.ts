/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  messages: any[];
  profile: null | { [key: string]: string };
  
};

const initialState: initialStateType = {
  messages: [],
  profile: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateMessages(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    updateReadMessage(state, action) {
      state.messages[action.payload.index] = action.payload.message;
    },
    updateUserProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { updateMessages, updateReadMessage, updateUserProfile } =
  UserSlice.actions;
export default UserSlice.reducer;
