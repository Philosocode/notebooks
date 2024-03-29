import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserState } from "./user.types";
import { ILoginPayload } from "./user.types";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../shared/constants.shared";
import { getUserSettings, loginEmail, register, updateUserSettings } from "./user.thunks";
import { loginGoogle } from "./user.thunks";

const initialState: IUserState = {
  user: undefined,
  settings: undefined,
  token: undefined,
};

function saveTokenToStorageAction(action: AnyAction) {
  return [
    loginGoogle.fulfilled.type,
    loginEmail.fulfilled.type,
    register.fulfilled.type
  ].includes(action.type);
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginPayload>) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;

      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        if (!state.settings) return;
        if (!action.payload?.updates) return;

        const updatedSettings = {
          ...state.settings,
          ...action.payload.updates,
        }

        state.settings = updatedSettings;
      })
      .addMatcher(saveTokenToStorageAction, (state, action) => {
        const { token } = action.payload;
  
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      })
  }
});

export const {
  login,
  logout,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
