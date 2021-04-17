import { createAsyncThunk } from "@reduxjs/toolkit";

import { INote } from "./note.types";
import { api } from "../../services/api.service";

interface ICreateNotePayload {
  sectionId: string;
  initialValues?: {
    name: string;
    content: string;
  }
}
interface ICreateNoteResponse {
  status: string;
  data: {
    note: INote;
  }
}
export const createNote = createAsyncThunk(
  "note/createNote",
  async function (payload: ICreateNotePayload, thunkAPI) {
    const { initialValues, sectionId } = payload;
    try {
      const response = await api.post<ICreateNoteResponse>(
        `/sections/${sectionId}/notes`,
        initialValues ?? { name: "", content: "" }
      );

      const { note } = response.data.data;

      return { note, sectionId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetNotesResponse {
  status: string;
  data: {
    notes: INote[];
  };
}
export const getNotes = createAsyncThunk(
  "note/getNotes",
  async function (sectionId: string, thunkAPI) {
    try {
      const response = await api.get<IGetNotesResponse>(`/sections/${sectionId}/notes`);
      const { notes } = response.data.data;

      return { notes, sectionId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IUpdateNotePayload {
  sectionId: string;
  noteId: string;
  updates: {
    name?: string;
    content?: string;
  }
}
export const updateNote = createAsyncThunk(
  "note/updateNote",
  async function (payload: IUpdateNotePayload, thunkAPI) {
    const { sectionId, noteId, updates } = payload;

    try {
      await api.patch(`/sections/${sectionId}/notes/${noteId}`, { ...updates });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateNotePosition {
  sectionId: string;
  noteId: string;
  newPosition: number;
}
export const updateNotePosition = createAsyncThunk(
  "note/updateNotePosition",
  async function (payload: IUpdateNotePosition, thunkAPI) {
    const {sectionId, noteId, newPosition } = payload;

    try {
      await api.patch(`/sections/${sectionId}/notes/${noteId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteNotePayload {
  sectionId: string;
  noteId: string;
}
export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async function (payload: IDeleteNotePayload, thunkAPI) {
    const { sectionId, noteId } = payload;

    try {
      await api.delete(`/sections/${sectionId}/notes/${noteId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
