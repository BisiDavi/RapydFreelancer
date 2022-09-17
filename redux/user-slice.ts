/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  messages: any[];
  profile: null | { [key: string]: any[] | any };
  walletId: string;
  payment: {
    connect: number | null;
  };
};

const initialState: initialStateType = {
  messages: [],
  profile: null,
  walletId: "",
  payment: {
    connect: null,
  },
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
    updatePaymentConnect(
      state,
      action: PayloadAction<initialStateType["payment"]["connect"]>
    ) {
      state.payment.connect = action.payload;
    },
  },
});

export const {
  updateMessages,
  updateReadMessage,
  updateUserProfile,
  updateWallet,
  updatePaymentConnect,
} = UserSlice.actions;
export default UserSlice.reducer;
