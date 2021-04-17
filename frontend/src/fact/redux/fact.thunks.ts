import { createAsyncThunk } from "@reduxjs/toolkit";

import { IFact } from "./fact.types";
import { api } from "../../services/api.service";

interface ICreateFactPayload {
  sectionId: string;
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
    const { initialValues, sectionId } = payload;
    try {
      const response = await api.post<ICreateFactResponse>(
        `/sections/${sectionId}/facts`, initialValues
      );

      const { fact } = response.data.data;

      return { fact, sectionId };
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
  async function (sectionId: string, thunkAPI) {
    try {
      const response = await api.get<IGetFactsResponse>(`/sections/${sectionId}/facts`);
      const { facts } = response.data.data;

      return { facts, sectionId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IUpdateFactPayload {
  sectionId: string;
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
    const { sectionId, factId, updates } = payload;

    try {
      await api.patch(`/sections/${sectionId}/facts/${factId}`, updates);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateFactPosition {
  sectionId: string;
  factId: string;
  newPosition: number;
}
export const updateFactPosition = createAsyncThunk(
  "fact/updateFactPosition",
  async function (payload: IUpdateFactPosition, thunkAPI) {
    const {sectionId, factId, newPosition } = payload;

    try {
      await api.patch(`/sections/${sectionId}/facts/${factId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteFactPayload {
  sectionId: string;
  factId: string;
}
export const deleteFact = createAsyncThunk(
  "fact/deleteFact",
  async function (payload: IDeleteFactPayload, thunkAPI) {
    const { sectionId, factId } = payload;

    try {
      await api.delete(`/sections/${sectionId}/facts/${factId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);