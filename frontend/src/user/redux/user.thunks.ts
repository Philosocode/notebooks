import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async function (_, thunkAPI) {
    try {
      const res = await api.get("/");
      return res.data.data;
    } catch (err) {
      console.error(err);
      thunkAPI.rejectWithValue(err);
    }
  }
);