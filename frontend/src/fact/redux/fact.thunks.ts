import { createAsyncThunk } from "@reduxjs/toolkit";

import { IFact } from "./fact.types";
import { api } from "../../services/api.service";

interface ICreateFactPayload {
  partId: string;
  initialValues: {
    question: string;
    answer: string;
  }
}
interface ICreateFactResponse {
  status: string;
  data: {
    fact: IFact;
  }
}
export const createFact = createAsyncThunk(
  "fact/createFact",
  async function (payload: ICreateFactPayload, thunkAPI) {
    const { initialValues, partId } = payload;
    try {
      const response = await api.post<ICreateFactResponse>(
        `/parts/${partId}/facts`, initialValues
      );

      const { fact } = response.data.data;

      return { fact, partId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetFactsResponse {
  status: string;
  data: {
    facts: IFact[];
  };
}
export const getFacts = createAsyncThunk(
  "fact/getFacts",
  async function (partId: string, thunkAPI) {
    try {
      const response = await api.get<IGetFactsResponse>(`/parts/${partId}/facts`);
      const { facts } = response.data.data;

      return { facts, partId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IUpdateFactPayload {
  partId: string;
  factId: string;
  updates: {
    question?: string;
    answer?: string;
    mastered?: boolean;
  }
}
export const updateFact = createAsyncThunk(
  "fact/updateFact",
  async function (payload: IUpdateFactPayload, thunkAPI) {
    const { partId, factId, updates } = payload;

    try {
      await api.patch(`/parts/${partId}/facts/${factId}`, updates);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateFactPosition {
  partId: string;
  factId: string;
  newPosition: number;
}
export const updateFactPosition = createAsyncThunk(
  "fact/updateFactPosition",
  async function (payload: IUpdateFactPosition, thunkAPI) {
    const {partId, factId, newPosition } = payload;

    try {
      await api.patch(`/parts/${partId}/facts/${factId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteFactPayload {
  partId: string;
  factId: string;
}
export const deleteFact = createAsyncThunk(
  "fact/deleteFact",
  async function (payload: IDeleteFactPayload, thunkAPI) {
    const { partId, factId } = payload;

    try {
      await api.delete(`/parts/${partId}/facts/${factId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);