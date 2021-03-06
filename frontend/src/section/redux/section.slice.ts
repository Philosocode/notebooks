import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISectionState } from "./section.types";
import { deleteSection, getSections } from "./section.thunks";
import omit from "lodash/omit";

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
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { sectionId } = action.payload;

        state.sections = omit(state.sections, [sectionId]);
      })

  }
});

export const sectionReducer = sectionSlice.reducer;