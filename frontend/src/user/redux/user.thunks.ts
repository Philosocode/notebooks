import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";
import { IUser, IUserSettings } from "./user.types";

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async function (_, thunkAPI) {
    try {
      const res = await api.get("/");
      return res.data.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetUserSettingsResponse {
  status: string;
  data: {
    user: IUser;
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