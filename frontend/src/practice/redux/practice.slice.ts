import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPracticeState } from "./practice.types";

const initialState: Partial<IPracticeState> = {
  id: undefined,
  source: undefined,
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    setPracticeState: (state, action: PayloadAction<IPracticeState>) => {
      return action.payload;
    },
  },
});

export const practiceReducer = practiceSlice.reducer;
export const { setPracticeState } = practiceSlice.actions;