import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConcepts } from "./concept.thunks";

import { IConceptState } from "./concept.types";

const initialState: IConceptState = {
  concepts: [],
  currConcept: undefined,
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    deleteConcept: (state, action: PayloadAction<string>) => {
      const foundIdx = state.concepts.findIndex(c => c.id === action.payload);

      if (foundIdx !== -1) {
        state.concepts.splice(foundIdx, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getConcepts.fulfilled, (state, action) => {
      state.concepts = action.payload;
    })
  },
});

export const conceptReducer = conceptSlice.reducer;
export const { deleteConcept } = conceptSlice.actions;