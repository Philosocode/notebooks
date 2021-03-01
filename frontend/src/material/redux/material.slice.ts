import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMaterialState } from "./material.types";
import { deleteMaterial, getMaterials } from "./material.thunks";
import { getEntityIndex } from "shared/utils/entity.util";

const initialState: IMaterialState = {
  materials: [],
  currentMaterialId: undefined,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setCurrentMaterialId: (state, action: PayloadAction<string>) => {
      state.currentMaterialId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        const materialIndex = getEntityIndex(state.materials, action.payload);

        if (materialIndex === -1) return;

        state.materials.splice(materialIndex, 1);
      })
  },
});

export const materialReducer = materialSlice.reducer;
export const { setCurrentMaterialId } = materialSlice.actions;