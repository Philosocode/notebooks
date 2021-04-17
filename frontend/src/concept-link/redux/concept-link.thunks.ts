import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConceptSection } from "./concept-link.types";
import { api } from "services/api.service";
import { ISection } from "section/redux/section.types";

/* Concept Section */
interface IGetConceptSectionsResponse {
  status: string;
  data: {
    conceptSections: IConceptSection[];
  };
}
export const getConceptSections = createAsyncThunk(
  "concept-section/getConceptSections",
  async function (sectionId: string, thunkAPI) {
    try {
      const response = await api.get<IGetConceptSectionsResponse>(`/sections/${sectionId}/links`);

      return {
        sectionId,
        conceptSections: response.data.data.conceptSections,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ICreateConceptSectionPayload {
  conceptId: string;
  section: ISection;
}
interface ICreateConceptSectionResponse {
  status: string;
  data: {
    conceptSection: {
      conceptId: string;
      sectionId: string;
    };
  };
}
export const createConceptSection = createAsyncThunk(
  "concept-section/createConceptSection",
  async function (payload: ICreateConceptSectionPayload, thunkAPI) {
    const { conceptId, section } = payload;

    try {
      await api.post<ICreateConceptSectionResponse>(`/sections/${section.id}/links`, { conceptId });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IDeleteConceptSectionPayload {
  conceptId: string;
  section: ISection;
}
export const deleteConceptSection = createAsyncThunk(
  "concept-section/deleteConceptSection",
  async function (payload: IDeleteConceptSectionPayload, thunkAPI) {
    const { conceptId, section } = payload;

    try {
      await api.delete(`/sections/${section.id}/links/${conceptId}`);

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
