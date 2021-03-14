import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { IMaterial, IMaterialState } from "./material.types";
import { createMaterial, deleteMaterial, getMaterials, updateMaterial } from "./material.thunks";
import { deleteMaterialTag, deleteTagFromMaterial, updateMaterialTag } from "./material-tag.thunk";
import { createPart, deletePart, getPart, getParts } from "part/redux/part.thunks";
import { IRepositionEntityPayload } from "shared/types.shared";

const initialState: IMaterialState = {
  materials: {},
  currentMaterialId: undefined,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setCurrentMaterialId: (state, action: PayloadAction<string>) => {
      state.currentMaterialId = action.payload;
    },
    repositionPart: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: materialId, oldIndex, newIndex } = action.payload;

      const partIds = state.materials[materialId].partIds;
      if (!partIds) return;

      const [partToReposition] = partIds.splice(oldIndex, 1);
      partIds.splice(newIndex, 0, partToReposition);
    }
  },
  extraReducers: (builder) => {
    builder
      /* Material */
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.materials[action.payload.id] = action.payload;
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materials = action.payload.reduce<{[key: string]: IMaterial}>((hash, material) => {
          hash[material.id] = material;

          return hash;
        }, {});
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        const { materialId, updates } = action.payload;

        state.materials[materialId] = {
          ...state.materials[materialId],
          ...updates,
          updated_at: new Date().toUTCString()
        };
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.materials = omit(state.materials, [action.payload]);
      })

      /* Material Tag */
      .addCase(updateMaterialTag.fulfilled, (state, action) => {
        const { newTagName, oldTagName } = action.payload;

        // loop through all the concepts
        Object.values(state.materials).forEach((m) => {
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

        const materialTags = state.materials[materialId].tags;

        const tagIndex = materialTags.findIndex((t) => t === tagName);
        if (tagIndex === -1) return;

        materialTags.splice(tagIndex, 1);
      })
      .addCase(deleteMaterialTag.fulfilled, (state, action) => {
        const tagToRemove = action.payload;

        // loop through all concepts
        Object.values(state.materials).forEach((material) => {
          const tagIdx = material.tags.findIndex((t) => t === tagToRemove);

          if (tagIdx !== -1) material.tags.splice(tagIdx, 1);
        });
      })

      /* Parts */
      .addCase(getParts.fulfilled, (state, action) => {
        const { materialId, parts } = action.payload;

        const materialToUpdate = state.materials[materialId];
        const partIds = parts.map(part => part.id);

        if (!materialToUpdate.partIds) materialToUpdate.partIds = [];
        materialToUpdate.partIds.push(...partIds);
      })
      .addCase(getPart.fulfilled, (state, action) => {
        const { part } = action.payload;

        const materialToUpdate = state.materials[part.material_id];
        if (!materialToUpdate) return;

        if (!materialToUpdate.partIds) materialToUpdate.partIds = [];

        materialToUpdate.partIds.push(part.id);
      })
      .addCase(createPart.fulfilled, (state, action) => {
        const { materialId, part } = action.payload;

        const materialToUpdate = state.materials[materialId];

        if (!materialToUpdate.partIds) materialToUpdate.partIds = [];
        materialToUpdate.partIds.push(part.id);
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        const { materialId, part } = action.payload;

        const materialToUpdate = state.materials[materialId];

        if (!materialToUpdate.partIds) return;

        // remove the part ID from the array
        const partIdIndex = materialToUpdate.partIds.findIndex(id => id === part.id);
        if (partIdIndex === -1) return;

        materialToUpdate.partIds.splice(partIdIndex, 1);
      })
  },
});

export const materialReducer = materialSlice.reducer;
export const { setCurrentMaterialId, repositionPart } = materialSlice.actions;