import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISectionState } from "./section.types";
import { getSections } from "./section.thunks";

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
  }
});

export const sectionReducer = sectionSlice.reducer;