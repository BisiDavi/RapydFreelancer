import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  skills: [],
  selectedSkills: [],
};

const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateSkills(
      state,
      action: PayloadAction<{ label: string; value: string }[]>
    ) {
      state.skills = action.payload;
    },
    updateSelectedSkills(
      state,
      action: PayloadAction<{ label: string; value: string }[]>
    ) {
      state.selectedSkills = action.payload;
    },
  },
});

export const { updateSkills, updateSelectedSkills } = FormSlice.actions;
export default FormSlice.reducer;
