import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConceptSectionLink } from "./concept-link.types";
import { api } from "services/api.service";
import { ISection } from "section/redux/section.types";

/* Concept Section */
interface IGetConceptSectionLinksResponse {
  status: string;
  data: {
    conceptSectionLinks: IConceptSectionLink[];
  };
}
export const getConceptSectionLinks = createAsyncThunk(
  "concept-section/getConceptSectionLinks",
  async function (sectionId: string, thunkAPI) {
    try {
      const response = await api.get<IGetConceptSectionLinksResponse>(`/sections/${sectionId}/links`);

      return {
        sectionId,
        conceptSectionLinks: response.data.data.conceptSectionLinks,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ICreateConceptSectionLinkPayload {
  conceptId: string;
  section: ISection;
}
interface ICreateConceptSectionLinkResponse {
  status: string;
  data: {
    conceptSectionLink: {
      conceptId: string;
      sectionId: string;
    };
  };
}
export const createConceptSection = createAsyncThunk(
  "concept-section/createConceptSection",
  async function (payload: ICreateConceptSectionLinkPayload, thunkAPI) {
    const { conceptId, section } = payload;

    try {
      await api.post<ICreateConceptSectionLinkResponse>(`/sections/${section.id}/links`, { conceptId });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IDeleteConceptSectionLinkPayload {
  conceptId: string;
  section: ISection;
}
export const deleteConceptSectionLink = createAsyncThunk(
  "concept-section/deleteConceptSection",
  async function (payload: IDeleteConceptSectionLinkPayload, thunkAPI) {
    const { conceptId, section } = payload;

    try {
      await api.delete(`/sections/${section.id}/links/${conceptId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

/* Concept Notebook Links */
interface IGetNotebookLinksResponse {
  status: string;
  data: {
    notebookLinks: string[];
  };
}
export const getNotebookLinksForConcept = createAsyncThunk(
  "concept-link/getNotebookLinksForConcept",
  async function (conceptId: string, thunkAPI) {
    try {
      const response = await api.get<IGetNotebookLinksResponse>(`/concepts/${conceptId}/links?notebooks`);

      return {
        conceptId,
        notebookLinks: response.data.data.notebookLinks,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)
