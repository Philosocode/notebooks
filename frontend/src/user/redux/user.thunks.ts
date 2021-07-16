import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";
import { ILoginPayload, IUserSettings } from "./user.types";
import { login } from "./user.slice";
import { TResStatus } from "../../shared/types.shared";
import { showAndHideAlert } from "alert/redux/alert.thunks";

interface ILoginResponse {
  data: ILoginPayload;
  status: TResStatus;
  message?: string;
}
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async function (token: string, thunkAPI) {
    try {
      const res = await api.post<ILoginResponse>("/auth/google", { token });

      if (res.data.message?.includes("email and password")) {
        thunkAPI.dispatch(showAndHideAlert({
          message: "Try logging in with email and password",
          type: "warning",
        }));

        return thunkAPI.rejectWithValue({});
      } else {
        thunkAPI.dispatch(login(res.data.data));

        return res.data.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ILoginEmailPayload {
  email: string;
  password: string;
}
export const loginEmail = createAsyncThunk(
  "auth/loginEmail",
  async function (payload: ILoginEmailPayload, thunkAPI) {
    try {
      const res = await api.post<ILoginResponse>("/auth/login", payload);

      if (res.data.message?.includes("google")) {
        thunkAPI.dispatch(showAndHideAlert({
          message: "try logging in with google",
          type: "warning",
        }));

        return thunkAPI.rejectWithValue({});
      } else {
        thunkAPI.dispatch(login(res.data.data));

        return res.data.data;
      }
    } catch (err) {
      thunkAPI.dispatch(showAndHideAlert({
        message: "Incorrect email and/or password",
        type: "warning",
      }));
      return thunkAPI.rejectWithValue(err);
    }
  }
)

interface IGetUserSettingsResponse {
  status: string;
  data: {
    user: {
      settings: IUserSettings;
    };
  };
}
export const getUserSettings = createAsyncThunk(
  "user/getUserSettings",
  async function(userId: string, thunkAPI) {
    try {
      const res = await api.get<IGetUserSettingsResponse>(`/users/${userId}`);

      return res.data.data.user.settings;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
)

interface IUpdateUserSettingsPayload {
  userId: string;
  updates: Partial<IUserSettings>;
}
export const updateUserSettings = createAsyncThunk(
  "user/updateUserSettings",
  async function(payload: IUpdateUserSettingsPayload, thunkAPI) {
    const { updates, userId } = payload;

    try {
      await api.patch(`/users/${userId}`, { settings: updates });

      return payload;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
)