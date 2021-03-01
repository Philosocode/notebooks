import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMaterialState } from "./material.types";
import { getMaterials } from "./material.thunks";

// tag === "" means "All"
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
  }
});

export const materialReducer = materialSlice.reducer;
export const { setCurrentMaterialId } = materialSlice.actions;