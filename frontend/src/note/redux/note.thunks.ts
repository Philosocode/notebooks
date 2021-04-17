import { createAsyncThunk } from "@reduxjs/toolkit";

import { INote } from "./note.types";
import { api } from "../../services/api.service";

interface ICreateNotePayload {
  partId: string;
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
    const { initialValues, partId } = payload;
    try {
      const response = await api.post<ICreateNoteResponse>(
        `/parts/${partId}/notes`,
        initialValues ?? { name: "", content: "" }
      );

      const { note } = response.data.data;

      return { note, partId };
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
  async function (partId: string, thunkAPI) {
    try {
      const response = await api.get<IGetNotesResponse>(`/parts/${partId}/notes`);
      const { notes } = response.data.data;

      return { notes, partId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IUpdateNotePayload {
  partId: string;
  noteId: string;
  updates: {
    name?: string;
    content?: string;
  }
}
export const updateNote = createAsyncThunk(
  "note/updateNote",
  async function (payload: IUpdateNotePayload, thunkAPI) {
    const { partId, noteId, updates } = payload;

    try {
      await api.patch(`/parts/${partId}/notes/${noteId}`, { ...updates });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateNotePosition {
  partId: string;
  noteId: string;
  newPosition: number;
}
export const updateNotePosition = createAsyncThunk(
  "note/updateNotePosition",
  async function (payload: IUpdateNotePosition, thunkAPI) {
    const {partId, noteId, newPosition } = payload;

    try {
      await api.patch(`/parts/${partId}/notes/${noteId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteNotePayload {
  partId: string;
  noteId: string;
}
export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async function (payload: IDeleteNotePayload, thunkAPI) {
    const { partId, noteId } = payload;

    try {
      await api.delete(`/parts/${partId}/notes/${noteId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
