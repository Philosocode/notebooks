import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConcept, IConceptConceptLink } from "./concept.types";
import { api } from "services/api.service";
import { showAndHideAlert } from "alert/redux/alert.thunks";

interface IGetConceptResponse {
  status: string;
  data: {
    concept: IConcept;
  };
}
export const getConcept = createAsyncThunk(
  "concept/getConcept",
  async function (conceptId: string, thunkAPI) {
    try {
      const res = await api.get<IGetConceptResponse>(
        `/concepts/${conceptId}?tags`
      );
      return res.data.data.concept;
    } catch (err) {
      thunkAPI.dispatch(
        showAndHideAlert({
          type: "error",
          message: "Failed to find concept with that ID",
        })
      );
      return thunkAPI.rejectWithValue(err);
     }
  }
);
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
      const res = await api.get<IGetConceptsResponse>("/concepts?tags");
      const { concepts } = res.data.data;

      return concepts;
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
      let createdConcept = res.data.data.concept;
      
      if (!createdConcept.tags) createdConcept.tags = [];

      createdConcept.hookIds = [];
      createdConcept.links = [];

      return createdConcept;
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
  async function (data: IUpdateConceptPayload, thunkAPI) {
    try {
      await api.patch(`/concepts/${data.id}`, {
        name: data.name,
        tags: data.tags,
      });
      return {
        id: data.id,
        updates: {
          name: data.name,
          tags: data.tags,
        }
      };
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

interface IDeleteTagFromConceptPayload {
  conceptId: string;
  tagName: string;
}
export const deleteTagFromConcept = createAsyncThunk(
  "concept/deleteTagFromConcept",
  async function (payload: IDeleteTagFromConceptPayload, thunkAPI) {
    const { conceptId, tagName } = payload;
    try {
      await api.delete(`/concepts/${conceptId}/tags/${tagName}`);
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetConceptConceptLinksResponse {
  status: string;
  data: {
    conceptConceptConceptLinks: IConceptConceptLink[];
  };
}
export const getConceptConceptLinks = createAsyncThunk(
  "concept/getConceptConceptLinks",
  async function (conceptId: string, thunkAPI) {
    try {
      const response = await api.get<IGetConceptConceptLinksResponse>(`/concepts/${conceptId}/links?concepts`);
      return response.data.data.conceptConceptConceptLinks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

interface ICreateConceptConceptLinkPayload {
  currentConceptId: string;
  otherConceptId: string;
}
interface ICreateConceptConceptLinkResponse {
  status: string;
  data: {
    conceptConceptConceptLink: {
      id: string;
      concept1_id: string;
      concept2_id: string;
    };
  };
}
export const createConceptConceptLink = createAsyncThunk(
  "concept/createConceptConceptLink",
  async function (payload: ICreateConceptConceptLinkPayload, thunkAPI) {
    try {
      const conceptIds = [ payload.currentConceptId, payload.otherConceptId ];
      const res = await api.post<ICreateConceptConceptLinkResponse>("/concepts/links", { conceptIds });

      const newLink = res.data.data.conceptConceptConceptLink;
      return {
        ...payload,
        id: newLink.id,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

export interface IDeleteConceptConceptLinkPayload {
  currentConceptId: string;
  otherConceptId: string;
  linkId: string;
}
export const deleteConceptConceptLink = createAsyncThunk(
  "concept/deleteConceptConceptLink",
  async function (payload: IDeleteConceptConceptLinkPayload, thunkAPI) {
    const { linkId } = payload;

    try {
      await api.delete(`/concepts/links/${linkId}`);
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);