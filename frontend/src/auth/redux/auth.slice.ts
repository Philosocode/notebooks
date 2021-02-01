import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_TOKEN_KEY } from "shared/constants.shared";
import { IAuthState } from "./auth.types";

import { loginGoogle } from "./auth.thunks";

const initialState: IAuthState = {
  user: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;

      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      const { token, user } = action.payload;

      state.user = user;
      state.token = token;

      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    })
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
