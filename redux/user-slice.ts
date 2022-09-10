/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  messages: any[];
};

const initialState: initialStateType = {
  messages: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateMessages(state, action) {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { updateMessages } = UserSlice.actions;
export default UserSlice.reducer;
