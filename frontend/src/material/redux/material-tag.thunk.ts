import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";

interface IUpdateMaterialTagPayload {
  oldTagName: string;
  newTagName: string;
}
export const updateMaterialTag = createAsyncThunk(
  "material/updateMaterialTag",
  async function (payload: IUpdateMaterialTagPayload, thunkAPI) {
    const { newTagName, oldTagName } = payload;

    try {
      await api.patch(`/materials/tags/${oldTagName}`, { name: newTagName });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteMaterialTag = createAsyncThunk(
  "material/deleteMaterialTag",
  async function (tagName: string, thunkAPI) {
    try {
      await api.delete(`/materials/tags/${tagName}`);

      return tagName;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
