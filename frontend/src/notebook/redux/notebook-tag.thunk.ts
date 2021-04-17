import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services/api.service";

interface IUpdateNotebookTagPayload {
  oldTagName: string;
  newTagName: string;
}
export const updateNotebookTag = createAsyncThunk(
  "notebook/updateNotebookTag",
  async function (payload: IUpdateNotebookTagPayload, thunkAPI) {
    const { newTagName, oldTagName } = payload;

    try {
      await api.patch(`/notebooks/tags/${oldTagName}`, { name: newTagName });

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteTagFromNotebookPayload {
  notebookId: string;
  tagName: string;
}
export const deleteTagFromNotebook = createAsyncThunk(
  "notebook/deleteTagFromNotebook",
  async function (payload: IDeleteTagFromNotebookPayload, thunkAPI) {
    const { notebookId, tagName } = payload;
    try {
      await api.delete(`/notebooks/${notebookId}/tags/${tagName}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteNotebookTag = createAsyncThunk(
  "notebook/deleteNotebookTag",
  async function (tagName: string, thunkAPI) {
    try {
      await api.delete(`/notebooks/tags/${tagName}`);

      return tagName;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);