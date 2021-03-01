import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectMaterialState = (state: TAppState) => state.material;

export const selectMaterials = createSelector(
  [selectMaterialState],
  (state) => state.materials ?? []
);

export const selectCurrentMaterialId = createSelector(
  [selectMaterialState],
  (state) => state.currentMaterialId
);

export const selectCurrentMaterial = createSelector(
  [selectMaterials, selectCurrentMaterialId],
  (materials, currentMaterialId) =>
    materials.find(m => m.id === currentMaterialId)
);

export const selectMaterialTags = createSelector(
  [selectMaterials],
  (materials) => {
    const tags = new Set<string>();

    materials.forEach(c => {
      c.tags.forEach(t => {
        tags.add(t);
      });
    });

    return Array.from(tags).sort();
  }
);
