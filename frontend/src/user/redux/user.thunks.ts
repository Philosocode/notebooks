import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";
import { ILoginPayload, IUserSettings } from "./user.types";
import { login } from "./user.slice";
import { TResStatus } from "../../shared/types.shared";

interface ILoginResponse {
  data: ILoginPayload;
  status: TResStatus;
}
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async function (token: string, thunkAPI) {
    try {
      const res = await api.post<ILoginResponse>("/auth/google", { token });

      thunkAPI.dispatch(login(res.data.data));

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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