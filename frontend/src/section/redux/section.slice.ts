import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { ISectionState } from "./section.types";
import { createSection, deleteSection, getSections, updateSection } from "./section.thunks";

const initialState: ISectionState  = {
  sections: {}
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSection.fulfilled, (state, action) => {
        const newSection = action.payload.section;

        state.sections[newSection.id] = newSection;
      })
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