/* eslint-disable no-param-reassign */
import { linkType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  formData: { data: any; link: linkType; ewallet?: string } | null;
};

const initialState: initialStateType = {
  formData: null,
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePaymentFormData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { updatePaymentFormData } = PaymentSlice.actions;
export default PaymentSlice.reducer;
