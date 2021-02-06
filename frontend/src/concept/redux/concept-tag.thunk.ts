import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";

interface IUpdateConceptTagPayload {
  oldTagName: string;
  newTagName: string;
}
export const updateConceptTag = createAsyncThunk(
  "concept/updateConceptTag",
  async function (payload: IUpdateConceptTagPayload, thunkAPI) {
    const { newTagName, oldTagName } = payload;
    try {
      await api.patch(`/concepts/tags/${oldTagName}`, { name: newTagName });
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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
);
