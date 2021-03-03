import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPart, deletePart, getParts, updatePart } from "./part.thunks";
import omit from "lodash/omit";

import { IPart, IPartState } from "./part.types";

const initialState: IPartState  = {
  parts: {},
  currentPart: undefined,
};

const partSlice = createSlice({
  name: "part",
  initialState,
  reducers: {
    setCurrentPart: (state, action: PayloadAction<IPart>) => {
      state.currentPart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParts.fulfilled, (state, action) => {
        action.payload.parts.forEach(part => {
          // add to hash
          state.parts[part.id] = part;
        })
      })
      .addCase(createPart.fulfilled, (state, action) => {
        const { part } = action.payload;

        state.parts[part.id] = part;
      })
      .addCase(updatePart.fulfilled, (state, action) => {
        const { partId, name } = action.payload;

        state.parts[partId].name = name;
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        const { partId } = action.payload;

        state.parts = omit(state.parts, [partId]);
      })
  }
});

export const partReducer = partSlice.reducer;
export const {
  setCurrentPart,
} = partSlice.actions;