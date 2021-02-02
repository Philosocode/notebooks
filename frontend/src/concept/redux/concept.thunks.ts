import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConcept } from "./concept.types";
import { api } from "services/api.service";

interface IGetConceptsResponse {
  status: string;
  data: {
    concepts: IConcept[];
  };
}
export const getConcepts = createAsyncThunk(
  "concept/getConcepts",
  async function (_, thunkAPI) {
    try {
      const res = await api.get<IGetConceptsResponse>("/concepts");
      return res.data.data.concepts;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ICreateConceptResponse {
  status: string;
  data: {
    concept: IConcept;
  };
}
export const createConcept = createAsyncThunk(
  "concept/addConcept",
  async function (name: string, thunkAPI) {
    try {
      const res = await api.post<ICreateConceptResponse>("/concepts/", { name });
      return res.data.data.concept;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateConceptData {
  id: string;
  name: string;
}
export const updateConcept = createAsyncThunk(
  "concept/updateConcept",
  async function (data: IUpdateConceptData , thunkAPI) {
    try {
      await api.patch(`/concepts/${data.id}`, { name: data.name });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteConcept = createAsyncThunk(
  "concept/deleteConcept",
  async function (id: string, thunkAPI) {
    try {
      await api.delete(`/concepts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
