import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";

export const deleteConceptTag = createAsyncThunk(
  "concept/deleteConceptTag",
  async function (tagName: string, thunkAPI) {
    try {
      await api.delete(`/concepts/tags/${tagName}`);
      return tagName;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)
