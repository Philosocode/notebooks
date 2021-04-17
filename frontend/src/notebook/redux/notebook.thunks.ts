import { createAsyncThunk } from "@reduxjs/toolkit";

import { INotebook } from "./notebook.types";
import { api } from "services/api.service";

interface ICreateNotebookPayload {
  name: string;
  tags: string[];
}
interface ICreateNotebookResponse {
  status: string;
  data: {
    notebook: INotebook;
  };
}
export const createNotebook = createAsyncThunk(
  "notebook/createNotebook",
  async function (payload: ICreateNotebookPayload, thunkAPI) {
    try {
      const res = await api.post<ICreateNotebookResponse>("/notebooks/", payload);
      let createdNotebook = res.data.data.notebook;
      
      if (!createdNotebook.tags) createdNotebook.tags = [];

      return createdNotebook;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetNotebooksResponse {
  status: string;
  data: {
    notebooks: INotebook[];
  };
}
export const getNotebooks = createAsyncThunk(
  "notebook/getNotebooks",
  async function (_, thunkAPI) {
    try {
      const res = await api.get<IGetNotebooksResponse>("/notebooks?tags");
      const { notebooks } = res.data.data;

      return notebooks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateNotebookPayload {
  id: string;
  name: string;
  tags: string[];
}
export const updateNotebook = createAsyncThunk(
  "notebook/updateNotebook",
  async function (data: IUpdateNotebookPayload, thunkAPI) {
    try {
      await api.patch(`/notebooks/${data.id}`, {
        name: data.name,
        tags: data.tags,
      });
      return {
        notebookId: data.id,
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

export const deleteNotebook = createAsyncThunk(
  "notebook/deleteNotebook",
  async function (id: string, thunkAPI) {
    try {
      await api.delete(`/notebooks/${id}`);

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);