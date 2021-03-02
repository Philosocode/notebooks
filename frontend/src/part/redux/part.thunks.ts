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
);

interface ICreatePartPayload {
  name: string;
  materialId: string;
}
interface ICreateHookResponse {
  status: string;
  data: {
    part: IPart;
  };
}
export const createPart = createAsyncThunk(
  "part/createPart",
  async function (payload: ICreatePartPayload, thunkAPI) {
    const { materialId, name } = payload;

    try {
      const res = await api.post<ICreateHookResponse>(`/materials/${materialId}/parts`, {
        name,
        materialId,
      });
      const createdPart = res.data.data.part;

      return { part: createdPart, materialId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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