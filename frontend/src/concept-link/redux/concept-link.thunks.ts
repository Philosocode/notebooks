import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConceptPart } from "./concept-link.types";
import { api } from "services/api.service";
import { IPart } from "part/redux/part.types";

/* Concept Part */
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
);

interface ICreateConceptPartPayload {
  conceptId: string;
  part: IPart;
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
    const { conceptId, part } = payload;

    try {
      await api.post<ICreateConceptPartResponse>(`/parts/${part.id}/links`, { conceptId });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IDeleteConceptPartPayload {
  conceptId: string;
  part: IPart;
}
export const deleteConceptPart = createAsyncThunk(
  "concept-part/deleteConceptPart",
  async function (payload: IDeleteConceptPartPayload, thunkAPI) {
    const { conceptId, part } = payload;

    try {
      await api.delete(`/parts/${part.id}/links/${conceptId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

/* Concept Material */
interface IGetMaterialLinksResponse {
  status: string;
  data: {
    materialLinks: string[];
  };
}
export const getMaterialLinksForConcept = createAsyncThunk(
  "concept-link/getMaterialLinksForConcept",
  async function (conceptId: string, thunkAPI) {
    try {
      const response = await api.get<IGetMaterialLinksResponse>(`/concepts/${conceptId}/links?materials`);

      return {
        conceptId,
        materialLinks: response.data.data.materialLinks,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)
