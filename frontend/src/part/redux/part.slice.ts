import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPart, deletePart, getPart, getParts, updatePart } from "./part.thunks";
import omit from "lodash/omit";

import { IPartState } from "./part.types";

const initialState: IPartState  = {
  parts: {},
  currentPartId: undefined,
};

const partSlice = createSlice({
  name: "part",
  initialState,
  reducers: {
    setCurrentPartId: (state, action: PayloadAction<string>) => {
      state.currentPartId = action.payload;
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
      .addCase(getPart.fulfilled, (state, action) => {
        const fetchedPart = action.payload.part;
        state.parts[fetchedPart.id] = fetchedPart;
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
  setCurrentPartId,
} = partSlice.actions;