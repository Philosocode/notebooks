import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMaterialState } from "./material.types";
import { createMaterial, deleteMaterial, getMaterials, updateMaterial } from "./material.thunks";
import { getEntityIndex } from "shared/utils/entity.util";
import { deleteMaterialTag, deleteTagFromMaterial, updateMaterialTag } from "./material-tag.thunk";

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
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.materials.push(action.payload);
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        const { id, updates } = action.payload;

        const materialIndex = getEntityIndex(state.materials, id);
        if (materialIndex === -1) return;

        state.materials[materialIndex] = {
          ...state.materials[materialIndex],
          ...updates,
          updated_at: new Date().toUTCString()
        };
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        const materialIndex = getEntityIndex(state.materials, action.payload);

        if (materialIndex === -1) return;

        state.materials.splice(materialIndex, 1);
      })

      /* Material Tag */
      .addCase(updateMaterialTag.fulfilled, (state, action) => {
        const { newTagName, oldTagName } = action.payload;
        // loop through all the concepts
        state.materials.forEach((m) => {
          const materialTags = m.tags;
          // find the concepts with the oldTagName
          if (materialTags.includes(oldTagName)) {
            // remove the old tag
            const tagSet = new Set(materialTags);
            tagSet.delete(oldTagName);

            // add new tag
            tagSet.add(newTagName);

            m.tags = Array.from(tagSet).sort();
          }
        });
      })
      .addCase(deleteTagFromMaterial.fulfilled, (state, action) => {
        const { materialId, tagName } = action.payload;

        const materialIndex = getEntityIndex(state.materials, materialId);
        const materialTags = state.materials[materialIndex].tags;

        const tagIndex = materialTags.findIndex((t) => t === tagName);
        if (tagIndex === -1) return;

        materialTags.splice(tagIndex, 1);
      })
      .addCase(deleteMaterialTag.fulfilled, (state, action) => {
        const tagToRemove = action.payload;

        // loop through all concepts
        state.materials.forEach((m) => {
          const tagIdx = m.tags.findIndex((t) => t === tagToRemove);

          if (tagIdx !== -1) m.tags.splice(tagIdx, 1);
        });
      })
  },
});

export const materialReducer = materialSlice.reducer;
export const { setCurrentMaterialId } = materialSlice.actions;