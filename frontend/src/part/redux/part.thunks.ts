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

      return {
        materialId,
        parts: response.data.data.parts,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

interface IUpdatePartPosition {
  materialId: string;
  partId: string;
  newPosition: number;
}
export const updatePartPosition = createAsyncThunk(
  "part/updatePartPosition",
  async function (payload: IUpdatePartPosition, thunkAPI) {
    const { materialId, partId, newPosition } = payload;

    try {
      await api.patch(`/materials/${materialId}/parts/${partId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)