import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { IFactState } from "./fact.types";
import { createFact, deleteFact, getFacts, updateFact } from "./fact.thunks";

const initialState: IFactState  = {
  facts: {}
};

const factSlice = createSlice({
  name: "fact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFact.fulfilled, (state, action) => {
        const newFact = action.payload.fact;

        state.facts[newFact.id] = newFact;
      })
      .addCase(getFacts.fulfilled, (state, action) => {
        action.payload.facts.forEach(fact => {
          // add to hash
          state.facts[fact.id] = fact;
        })
      })
      .addCase(updateFact.fulfilled, (state, action) => {
        const { factId, updates } = action.payload;

        const oldFact = state.facts[factId];
        if (!oldFact) return;

        state.facts[factId] = {
          ...oldFact,
          ...updates,
        }
      })
      .addCase(deleteFact.fulfilled, (state, action) => {
        const { factId } = action.payload;

        state.facts = omit(state.facts, [factId]);
      })
  }
});

export const factReducer = factSlice.reducer;