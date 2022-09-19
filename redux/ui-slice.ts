/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { UIStateType } from "@/types/redux-types";

const initialState: UIStateType = {
  modal: null,
  accordion: null,
  apploaded: false,
  sidebar: null,
  mediaUpload: false,
  proposalSidebar: {
    data: null,
    active: null,
  },
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    updateModal(state, action: PayloadAction<UIStateType["modal"]>) {
      state.modal = action.payload;
    },
    toggleAccordion(state, action: PayloadAction<UIStateType["accordion"]>) {
      state.accordion = action.payload;
    },
    updateAppload(state, action: PayloadAction<UIStateType["apploaded"]>) {
      state.apploaded = action.payload;
    },
    updateSidebar(state, action: PayloadAction<UIStateType["sidebar"]>) {
      state.sidebar = action.payload;
    },
    updateMediaUpload(
      state,
      action: PayloadAction<UIStateType["mediaUpload"]>
    ) {
      state.mediaUpload = action.payload;
    },
    updateProposal(
      state,
      action: PayloadAction<UIStateType["proposalSidebar"]>
    ) {
      state.proposalSidebar = action.payload;
    },
    updateProposalStatus(state, action) {
      state.proposalSidebar.active = action.payload;
    },
  },
});

export const {
  updateModal,
  toggleAccordion,
  updateAppload,
  updateSidebar,
  updateMediaUpload,
  updateProposalStatus,
  updateProposal,
} = UISlice.actions;
export default UISlice.reducer;
