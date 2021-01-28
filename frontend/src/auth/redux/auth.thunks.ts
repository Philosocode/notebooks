import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";
import { TResStatus } from "shared/types.shared";
import { ILoginPayload } from "./auth.types";
import { login } from "./auth.slice";
// import { startLoading, stopLoading } from "loading/redux/loading.slice";

interface ILoginRes {
  data: ILoginPayload;
  status: TResStatus;
}

export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async function (token: string, thunkAPI) {
    try {
      const res = await api.post<ILoginRes>("/auth/google", { token });
      const { token: jwtToken, user } = res.data.data;

      thunkAPI.dispatch(login({ token: jwtToken, user }));

      return jwtToken;
    } catch (err) {
      console.error(err);
      thunkAPI.rejectWithValue(err);
    }
  }
);
