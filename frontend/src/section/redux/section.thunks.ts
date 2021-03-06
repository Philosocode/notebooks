import { createAsyncThunk } from "@reduxjs/toolkit";

import { ISection } from "./section.types";
import { api } from "../../services/api.service";

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
