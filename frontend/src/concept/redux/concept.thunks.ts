import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConcept } from "./concept.types";
import { api } from "services/api.service";

interface IGetConceptsResponse {
  status: string;
  data: {
    concepts: IConcept[];
  }
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
)