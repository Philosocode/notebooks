import { createSlice } from "@reduxjs/toolkit";

import { IConceptState } from "./concept.types";

const initialState: IConceptState = {
  concepts: [],
  currConcept: undefined,
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const conceptReducer = conceptSlice.reducer;
