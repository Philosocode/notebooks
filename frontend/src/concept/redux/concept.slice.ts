import { createSlice } from "@reduxjs/toolkit";
import { getConcepts } from "./concept.thunks";

import { IConceptState } from "./concept.types";

const initialState: IConceptState = {
  concepts: [],
  currConcept: undefined,
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConcepts.fulfilled, (state, action) => {
      state.concepts = action.payload;
    })
  },
});

export const conceptReducer = conceptSlice.reducer;
