import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getParts } from "./part.thunks";

import { IPart, IPartState } from "./part.types";

const initialState: IPartState  = {
  parts: [],
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
        state.parts.push(...action.payload);
      })
  }
});

export const partReducer = partSlice.reducer;
export const {
  setCurrentPart,
} = partSlice.actions;