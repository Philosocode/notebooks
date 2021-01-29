import { createSlice } from "@reduxjs/toolkit";
import { createConceptThunk, deleteConceptThunk, getConceptsThunk, updateConceptThunk } from "./concept.thunks";

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
    builder
      .addCase(createConceptThunk.fulfilled, (state, action) => {
        state.concepts.push(action.payload);
      })
      .addCase(deleteConceptThunk.fulfilled, (state, action) => {
        const foundIdx = state.concepts.findIndex(c => c.id === action.payload);

        if (foundIdx !== -1) {
          state.concepts.splice(foundIdx, 1);
        }
      })
      .addCase(getConceptsThunk.fulfilled, (state, action) => {
        state.concepts = action.payload;
      })
      .addCase(updateConceptThunk.fulfilled, (state, action) => {
        const { id, name } = action.payload;

        const conceptToUpdateIdx = state.concepts.findIndex(
          c => c.id === id
        );

        state.concepts[conceptToUpdateIdx].name = name;
      });
  },
});

export const conceptReducer = conceptSlice.reducer;