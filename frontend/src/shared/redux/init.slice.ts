import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitState } from "./init.types";
import { getConcepts } from "../../concept/redux/concept.thunks";
import { getMaterials } from "../../material/redux/material.thunks";
import { loginGoogle } from "../../auth/redux/auth.thunks";
import { login } from "auth/redux/auth.slice";

const initialState: IInitState = {
  conceptsLoaded: false,
  materialsLoaded: false,
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
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materialsLoaded = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.authLoaded = true;
      })
      .addCase(login, (state, action) => {
        state.authLoaded = true;
      })
  },
});

export const initReducer = initSlice.reducer;
export const { setWelcomeScreenShown } = initSlice.actions;