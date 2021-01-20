import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_TOKEN_KEY } from "shared/constants.shared";
import { IAuthState, ILoginPayload } from "../auth.types";

import { loginGoogle } from "./auth.thunks";

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
  extraReducers: {
    [loginGoogle.fulfilled.type]: (state, action: PayloadAction<string>) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload);
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
