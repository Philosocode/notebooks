import { createAsyncThunk } from "@reduxjs/toolkit";

import { IPart } from "./part.types";
import { api } from "services/api.service";

interface IGetPartsResponse {
  status: string;
  data: {
    parts: IPart[];
  };
}
export const getParts = createAsyncThunk(
  "part/getParts",
  async function (materialId: string, thunkAPI) {
    try {
      const response = await api.get<IGetPartsResponse>(`/materials/${materialId}/parts`);

      return response.data.data.parts;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)