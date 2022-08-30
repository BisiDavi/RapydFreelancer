/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showFooterAlert: true,
};

const LayoutSlice = createSlice({
  name: "Layout",
  initialState,
  reducers: {
    updateFooterAlert(state) {
      state.showFooterAlert = !state.showFooterAlert;
    },
  },
});

export const { updateFooterAlert } = LayoutSlice.actions;
export default LayoutSlice.reducer;
