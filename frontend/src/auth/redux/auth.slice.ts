import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_TOKEN_KEY } from "shared/constants.shared";
import { IAuthState, ILoginPayload } from "./auth.types";

import { loginGoogle } from "./auth.thunks";
import { getUserSettings } from "../../user/redux/user.thunks";

const initialState: IAuthState = {
  user: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginPayload>) => {
      const { user, token } = action.payload;

      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;

      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginGoogle.fulfilled, (_, action) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload);
      })
      .addCase(getUserSettings.fulfilled, (state, action) => {
        if (!state.user) return;

        state.user.settings = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
