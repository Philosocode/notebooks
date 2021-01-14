import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async function (_, thunkAPI) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
      return res.data.data;
    } catch (err) {
      console.error(err);
      thunkAPI.rejectWithValue(err);
    }
  }
);