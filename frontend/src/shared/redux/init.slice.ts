import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitState } from "./init.types";
import { getConcepts } from "../../concept/redux/concept.thunks";

const initialState: IInitState = {
  conceptsLoaded: false,
  welcomeScreenShown: false,
};

const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    setWelcomeScreenShown: (state, action: PayloadAction<boolean>) => {
      state.welcomeScreenShown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConcepts.fulfilled, (state, action) => {
        state.conceptsLoaded = true;
      })
  },
});

export const initReducer = initSlice.reducer;
export const { setWelcomeScreenShown } = initSlice.actions;