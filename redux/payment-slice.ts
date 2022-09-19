/* eslint-disable no-param-reassign */
import { linkType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  formData: { data: any; link: linkType; ewallet?: string } | null;
  hire: [] | null;
};

const initialState: initialStateType = {
  formData: null,
  hire: null,
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePaymentFormData(state, action) {
      state.formData = action.payload;
    },
    updateHire(state, action) {
      state.hire = action.payload;
    },
  },
});

export const { updatePaymentFormData, updateHire } = PaymentSlice.actions;
export default PaymentSlice.reducer;
