import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "shared/constants.shared";

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async function (_, thunkAPI) {
    try {
      const res = await axios.get(API_URL);
      return res.data.data;
    } catch (err) {
      console.error(err);
      thunkAPI.rejectWithValue(err);
    }
  }
);