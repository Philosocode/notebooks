import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitState } from "./init.types";
import { getConcepts } from "../../concept/redux/concept.thunks";
import { getNotebooks } from "../../notebook/redux/notebook.thunks";
import { getUserSettings } from "../../user/redux/user.thunks";

const initialState: IInitState = {
  settingsLoaded: false,
  conceptsLoaded: false,
  notebooksLoaded: false,
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
      .addCase(getNotebooks.fulfilled, (state, action) => {
        state.notebooksLoaded = true;
      })
      .addCase(getUserSettings.fulfilled, (state, action) => {
        state.settingsLoaded = true;
      })
  },
});

export const initReducer = initSlice.reducer;
export const { setWelcomeScreenShown } = initSlice.actions;