import { createAsyncThunk } from "@reduxjs/toolkit";

import { IMaterial } from "./material.types";
import { api } from "services/api.service";

interface ICreateMaterialPayload {
  name: string;
  tags: string[];
}
interface ICreateMaterialResponse {
  status: string;
  data: {
    material: IMaterial;
  };
}
export const createMaterial = createAsyncThunk(
  "material/createMaterial",
  async function (payload: ICreateMaterialPayload, thunkAPI) {
    try {
      const res = await api.post<ICreateMaterialResponse>("/materials/", payload);
      let createdMaterial = res.data.data.material;
      
      if (!createdMaterial.tags) createdMaterial.tags = [];

      return createdMaterial;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetMaterialsResponse {
  status: string;
  data: {
    materials: IMaterial[];
  };
}
export const getMaterials = createAsyncThunk(
  "material/getMaterials",
  async function (_, thunkAPI) {
    try {
      const res = await api.get<IGetMaterialsResponse>("/materials?tags");
      const { materials } = res.data.data;

      return materials;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateMaterialPayload {
  id: string;
  name: string;
  tags: string[];
}
export const updateMaterial = createAsyncThunk(
  "material/updateMaterial",
  async function (data: IUpdateMaterialPayload, thunkAPI) {
    try {
      await api.patch(`/materials/${data.id}`, {
        name: data.name,
        tags: data.tags,
      });
      return {
        materialId: data.id,
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

export const deleteMaterial = createAsyncThunk(
  "material/deleteMaterial",
  async function (id: string, thunkAPI) {
    try {
      await api.delete(`/materials/${id}`);

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);