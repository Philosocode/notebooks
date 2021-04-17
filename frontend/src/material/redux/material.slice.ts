import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { IMaterial, IMaterialState } from "./material.types";
import { createMaterial, deleteMaterial, getMaterials, updateMaterial } from "./material.thunks";
import { deleteMaterialTag, deleteTagFromMaterial, updateMaterialTag } from "./material-tag.thunk";
import { createSection, deleteSection, getSection, getSections } from "section/redux/section.thunks";
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
    repositionSection: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: materialId, oldIndex, newIndex } = action.payload;

      const sectionIds = state.materials[materialId].sectionIds;
      if (!sectionIds) return;

      const [sectionToReposition] = sectionIds.splice(oldIndex, 1);
      sectionIds.splice(newIndex, 0, sectionToReposition);
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

      /* Sections */
      .addCase(getSections.fulfilled, (state, action) => {
        const { materialId, sections } = action.payload;

        const materialToUpdate = state.materials[materialId];
        const sectionIds = sections.map(section => section.id);

        if (!materialToUpdate.sectionIds) materialToUpdate.sectionIds = [];
        materialToUpdate.sectionIds.push(...sectionIds);
      })
      .addCase(getSection.fulfilled, (state, action) => {
        const { section } = action.payload;

        const materialToUpdate = state.materials[section.material_id];
        if (!materialToUpdate) return;

        if (!materialToUpdate.sectionIds) materialToUpdate.sectionIds = [];

        materialToUpdate.sectionIds.push(section.id);
      })
      .addCase(createSection.fulfilled, (state, action) => {
        const { materialId, section } = action.payload;

        const materialToUpdate = state.materials[materialId];

        if (!materialToUpdate.sectionIds) materialToUpdate.sectionIds = [];
        materialToUpdate.sectionIds.push(section.id);
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { materialId, section } = action.payload;

        const materialToUpdate = state.materials[materialId];

        if (!materialToUpdate.sectionIds) return;

        // remove the section ID from the array
        const sectionIdIndex = materialToUpdate.sectionIds.findIndex(id => id === section.id);
        if (sectionIdIndex === -1) return;

        materialToUpdate.sectionIds.splice(sectionIdIndex, 1);
      })
  },
});

export const materialReducer = materialSlice.reducer;
export const { setCurrentMaterialId, repositionSection } = materialSlice.actions;