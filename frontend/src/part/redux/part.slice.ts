import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPart, getParts } from "./part.thunks";

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
  }
});

export const partReducer = partSlice.reducer;
export const {
  setCurrentPart,
} = partSlice.actions;