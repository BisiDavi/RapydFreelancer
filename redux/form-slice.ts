import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  skills: [],
  selectedSkills: [],
  jobId: 0,
  formData: null,
  media: [],
  formView: "post-job",
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
    updateMedia(state, action: PayloadAction<any>) {
      state.media = [...state.media, action.payload];
    },
    updateFormData(state, action) {
      state.formData = action.payload;
    },
    updateFormView(state, action) {
      state.formView = action.payload;
    },
    resetMedia(state) {
      state.media = [];
    },
  },
});

export const {
  updateSkills,
  updateSelectedSkills,
  updateJobId,
  resetMedia,
  updateFormData,
  updateFormView,
  updateMedia,
} = FormSlice.actions;
export default FormSlice.reducer;
