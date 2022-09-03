/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { FormStateType } from "@/types/redux-types";

const initialState: FormStateType = {
  postJobForm: {
    pricingModel: "FIXED_PRICE",
  },
};

const FormSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    updatePostJobForm(
      state,
      action: PayloadAction<FormStateType["postJobForm"]>
    ) {
      state.postJobForm = action.payload;
    },
  },
});

export const { updatePostJobForm } = FormSlice.actions;
export default FormSlice.reducer;
