import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";
import { TResStatus } from "shared/types.shared";
import { ILoginPayload } from "./auth.types";

interface ILoginResponse {
  data: ILoginPayload;
  status: TResStatus;
}
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async function (token: string, thunkAPI) {
    try {
      const res = await api.post<ILoginResponse>("/auth/google", { token });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
