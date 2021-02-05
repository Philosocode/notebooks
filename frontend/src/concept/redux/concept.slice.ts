import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createConcept, deleteConcept, deleteConceptTag, getConcepts, updateConcept } from "./concept.thunks";

import { IConceptState } from "./concept.types";

const initialState: IConceptState = {
  concepts: [],
  currConcept: undefined,
  currTag: undefined,
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    setCurrConceptTag: (state, action: PayloadAction<string>) => {
      state.currTag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConcept.fulfilled, (state, action) => {
        state.concepts.push(action.payload);
      })
      .addCase(deleteConcept.fulfilled, (state, action) => {
        const foundIdx = state.concepts.findIndex(c => c.id === action.payload);

        if (foundIdx !== -1) {
          state.concepts.splice(foundIdx, 1);
        }
      })
      .addCase(getConcepts.fulfilled, (state, action) => {
        state.concepts = action.payload;
      })
      .addCase(updateConcept.fulfilled, (state, action) => {
        const { id, name, tags } = action.payload;

        const conceptToUpdateIdx = state.concepts.findIndex(
          c => c.id === id
        );

        state.concepts[conceptToUpdateIdx].name = name;
        state.concepts[conceptToUpdateIdx].tags = tags;
      })
      .addCase(deleteConceptTag.fulfilled, (state, action) => {
        // remove the tag from the concept
        const { conceptId, tagName } = action.payload;
        const conceptToUpdateIdx = state.concepts.findIndex(c => c.id === conceptId);
        const conceptTags = state.concepts[conceptToUpdateIdx].tags;

        const tagIdx = conceptTags.findIndex(t => t === tagName);
        if (tagIdx !== -1) conceptTags.splice(tagIdx, 1);
      })
  },
});

export const conceptReducer = conceptSlice.reducer;
export const { setCurrConceptTag } = conceptSlice.actions;