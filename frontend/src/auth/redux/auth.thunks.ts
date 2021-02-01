import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";
import { TResStatus } from "shared/types.shared";
import { ILoginPayload } from "./auth.types";
import { login } from "./auth.slice";

interface ILoginResponse {
  data: ILoginPayload;
  status: TResStatus;
}
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async function (token: string, thunkAPI) {
    try {
      const res = await api.post<ILoginResponse>("/auth/google", { token });
      const { token: jwtToken, user } = res.data.data;

      thunkAPI.dispatch(login({ token: jwtToken, user }));

      return jwtToken;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
