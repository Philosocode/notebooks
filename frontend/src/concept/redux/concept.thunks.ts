import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConcept } from "./concept.types";
import { api } from "services/api.service";
import { createConcept, deleteConcept } from "./concept.slice";

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
export const createConceptThunk = createAsyncThunk(
  "concept/addConcept",
  async function (name: string, thunkAPI) {
    try {
      const res = await api.post<ICreateConceptResponse>("/concepts/", { name });
      thunkAPI.dispatch(createConcept(res.data.data.concept));
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteConceptThunk = createAsyncThunk(
  "concept/deleteConcept",
  async function (id: string, thunkAPI) {
    try {
      const res = await api.delete("/concepts/" + id);
      if (res.status === 204) {
        thunkAPI.dispatch(deleteConcept(id));
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
