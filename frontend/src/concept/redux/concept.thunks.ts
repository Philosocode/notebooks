import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConcept } from "./concept.types";
import { api } from "services/api.service";
import { deleteConcept } from "./concept.slice";

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

export const deleteConceptAsync = createAsyncThunk(
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
