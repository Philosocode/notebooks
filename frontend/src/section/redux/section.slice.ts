import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISectionState } from "./section.types";
import { deleteSection, getSections, updateSection } from "./section.thunks";
import omit from "lodash/omit";
import { IRepositionEntityPayload } from "../../shared/types.shared";

const initialState: ISectionState  = {
  sections: {}
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSections.fulfilled, (state, action) => {
        action.payload.sections.forEach(section => {
          // add to hash
          state.sections[section.id] = section;
        })
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        const { sectionId, updates } = action.payload;

        const oldSection = state.sections[sectionId];

        state.sections[sectionId] = {
          ...oldSection,
          ...updates,
        }
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { sectionId } = action.payload;

        state.sections = omit(state.sections, [sectionId]);
      })

  }
});

export const sectionReducer = sectionSlice.reducer;