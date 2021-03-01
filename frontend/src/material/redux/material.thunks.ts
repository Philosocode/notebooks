import { createAsyncThunk } from "@reduxjs/toolkit";

import { IMaterial } from "./material.types";
import { api } from "services/api.service";

interface IGetMaterialsResponse {
  status: string;
  data: {
    materials: IMaterial[];
  };
}
export const getMaterials = createAsyncThunk(
  "material/getMaterials",
  async function (_, thunkAPI) {
    try {
      const res = await api.get<IGetMaterialsResponse>("/materials?tags");
      const { materials } = res.data.data;
      console.log(materials);

      return materials;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);