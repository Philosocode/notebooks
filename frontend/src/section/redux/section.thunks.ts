import { createAsyncThunk } from "@reduxjs/toolkit";

import { ISection } from "./section.types";
import { api } from "../../services/api.service";

interface ICreateSectionPayload {
  partId: string;
  initialValues?: {
    name: string;
    content: string;
  }
}
interface ICreateSectionResponse {
  status: string;
  data: {
    section: ISection;
  }
}
export const createSection = createAsyncThunk(
  "section/createSection",
  async function (payload: ICreateSectionPayload, thunkAPI) {
    const { initialValues, partId } = payload;
    try {
      const response = await api.post<ICreateSectionResponse>(
        `/parts/${partId}/sections`,
        initialValues ?? { name: "", content: "" }
      );

      const { section } = response.data.data;

      return { section, partId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetSectionsResponse {
  status: string;
  data: {
    sections: ISection[];
  };
}
export const getSections = createAsyncThunk(
  "section/getSections",
  async function (partId: string, thunkAPI) {
    try {
      const response = await api.get<IGetSectionsResponse>(`/parts/${partId}/sections`);
      const { sections } = response.data.data;

      return { sections, partId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IUpdateSectionPayload {
  partId: string;
  sectionId: string;
  updates: {
    name?: string;
    content?: string;
  }
}
export const updateSection = createAsyncThunk(
  "section/updateSection",
  async function (payload: IUpdateSectionPayload, thunkAPI) {
    const { partId, sectionId, updates } = payload;

    try {
      await api.patch(`/parts/${partId}/sections/${sectionId}`, { ...updates });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateSectionPosition {
  partId: string;
  sectionId: string;
  newPosition: number;
}
export const updateSectionPosition = createAsyncThunk(
  "section/updateSectionPosition",
  async function (payload: IUpdateSectionPosition, thunkAPI) {
    const {partId, sectionId, newPosition } = payload;

    try {
      await api.patch(`/parts/${partId}/sections/${sectionId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteSectionPayload {
  partId: string;
  sectionId: string;
}
export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async function (payload: IDeleteSectionPayload, thunkAPI) {
    const { partId, sectionId } = payload;

    try {
      await api.delete(`/parts/${partId}/sections/${sectionId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
