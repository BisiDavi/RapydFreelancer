import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  skills: [],
};

const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateSkills(state, action: PayloadAction<string>) {
      state.skills = [...state.skills, action.payload];
    },
  },
});

export const { updateSkills } = FormSlice.actions;
export default FormSlice.reducer;
