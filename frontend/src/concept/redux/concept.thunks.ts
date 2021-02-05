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
      const res = await api.get<IGetConceptsResponse>("/concepts?tags&links");
      return res.data.data.concepts;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ICreateConceptPayload {
  name: string;
  tags: string[];
}
interface ICreateConceptResponse {
  status: string;
  data: {
    concept: IConcept;
  };
}
export const createConcept = createAsyncThunk(
  "concept/createConcept",
  async function (payload: ICreateConceptPayload, thunkAPI) {
    try {
      const res = await api.post<ICreateConceptResponse>("/concepts/", payload);
      return res.data.data.concept;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateConceptPayload {
  id: string;
  name: string;
  tags: string[];
}
export const updateConcept = createAsyncThunk(
  "concept/updateConcept",
  async function (data: IUpdateConceptPayload , thunkAPI) {
    try {
      await api.patch(`/concepts/${data.id}`, { name: data.name, tags: data.tags });
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

interface IDeleteConceptTagPayload {
  conceptId: string;
  tagName: string;
}
export const deleteConceptTag = createAsyncThunk(
  "concept/deleteConceptTag",
  async function (payload: IDeleteConceptTagPayload, thunkAPI) {
    const { conceptId, tagName } = payload;
    try {
      await api.delete(`/concepts/${conceptId}/tags/${tagName}`);
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)
