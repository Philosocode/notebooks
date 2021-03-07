import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConceptPart } from "./concept-link.types";
import { api } from "services/api.service";

interface IGetConceptPartsResponse {
  status: string;
  data: {
    conceptParts: IConceptPart[];
  };
}
export const getConceptParts = createAsyncThunk(
  "concept-part/getConceptParts",
  async function (partId: string, thunkAPI) {
    try {
      const response = await api.get<IGetConceptPartsResponse>(`/parts/${partId}/links`);

      return {
        partId,
        conceptParts: response.data.data.conceptParts,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

interface ICreateConceptPartPayload {
  conceptId: string;
  partId: string;
}
interface ICreateConceptPartResponse {
  status: string;
  data: {
    conceptPart: {
      conceptId: string;
      partId: string;
    };
  };
}
export const createConceptPart = createAsyncThunk(
  "concept-part/createConceptPart",
  async function (payload: ICreateConceptPartPayload, thunkAPI) {
    const { conceptId, partId } = payload;

    try {
      await api.post<ICreateConceptPartResponse>(`/parts/${partId}/links`, { conceptId });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IDeleteConceptPartPayload {
  conceptId: string;
  partId: string;
}
export const deleteConceptPart = createAsyncThunk(
  "concept-part/deleteConceptPart",
  async function (payload: IDeleteConceptPartPayload, thunkAPI) {
    const { conceptId, partId } = payload;

    try {
      await api.delete(`/parts/${partId}/links/${conceptId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);