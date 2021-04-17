import { createAsyncThunk } from "@reduxjs/toolkit";

import { ISection } from "./section.types";
import { api } from "services/api.service";
import { createNote } from "note/redux/note.thunks";

interface IGetSectionsResponse {
  status: string;
  data: {
    sections: ISection[];
  };
}
export const getSections = createAsyncThunk(
  "section/getSections",
  async function (materialId: string, thunkAPI) {
    try {
      const response = await api.get<IGetSectionsResponse>(`/materials/${materialId}/sections`);

      return {
        materialId,
        sections: response.data.data.sections,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


interface IGetSectionResponse {
  status: string;
  data: {
    section: ISection;
  };
}
export const getSection = createAsyncThunk(
  "section/getSection",
  async function (sectionId: string, thunkAPI) {
    try {
      const response = await api.get<IGetSectionResponse>(`/sections/${sectionId}`);

      return {
        section: response.data.data.section,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ICreateSectionPayload {
  name: string;
  materialId: string;
}
interface ICreateSectionResponse {
  status: string;
  data: {
    section: ISection;
  };
}
export const createSection = createAsyncThunk(
  "section/createSection",
  async function (payload: ICreateSectionPayload, thunkAPI) {
    const { materialId, name } = payload;

    try {
      const res = await api.post<ICreateSectionResponse>(`/materials/${materialId}/sections`, {
        name,
        materialId,
      });
      const createdSection = res.data.data.section;

      thunkAPI.dispatch(createNote({
        sectionId: createdSection.id,
        initialValues: {
          name: "Summary",
          content: "Insert summary of section here...",
        }
      }));

      return { section: createdSection, materialId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateSectionPayload {
  materialId: string;
  sectionId: string;
  name: string;
}
export const updateSection = createAsyncThunk(
  "section/updateSection",
  async function (payload: IUpdateSectionPayload, thunkAPI) {
    const { sectionId, name } = payload;

    try {
      await api.patch(`/sections/${sectionId}`, { name });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateSectionChecklist {
  sectionId: string;
  key: string;
  value: boolean;
}
export const updateSectionChecklist = createAsyncThunk(
  "section/updateSectionChecklist",
  async function (payload: IUpdateSectionChecklist, thunkAPI) {
    const { sectionId, key, value } = payload;

    const updates = {
      [key]: value
    };

    try {
      await api.patch(`/sections/${sectionId}`, { checklist: updates });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

interface IUpdateSectionPosition {
  materialId: string;
  sectionId: string;
  newPosition: number;
}
export const updateSectionPosition = createAsyncThunk(
  "section/updateSectionPosition",
  async function (payload: IUpdateSectionPosition, thunkAPI) {
    const { sectionId, newPosition } = payload;

    try {
      await api.patch(`/sections/${sectionId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteSectionPayload {
  materialId: string;
  section: ISection;
}
export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async function (payload: IDeleteSectionPayload, thunkAPI) {
    const { section } = payload;

    try {
      await api.delete(`/sections/${section.id}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
