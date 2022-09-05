import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  skills: [],
  selectedSkills: [],
  jobId: 0,
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
    updateJobId(state) {
      state.jobId = state.jobId + 1;
    },
  },
});

export const { updateSkills, updateSelectedSkills, updateJobId } =
  FormSlice.actions;
export default FormSlice.reducer;
