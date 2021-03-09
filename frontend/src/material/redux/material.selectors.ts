import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { IPart } from "part/redux/part.types";
import { selectPartHash } from "part/redux/part.selectors";

const selectMaterialState = (state: TAppState) => state.material;

export const selectMaterialHash = createSelector(
  [selectMaterialState],
  (state) => state.materials
);

export const selectMaterialList = createSelector(
  [selectMaterialHash],
  (hash) => Object.values(hash)
);

export const selectCurrentMaterialId = createSelector(
  [selectMaterialState],
  (state) => state.currentMaterialId
);

export const selectCurrentMaterial = createSelector(
  [selectMaterialHash, selectCurrentMaterialId],
  (materials, currentMaterialId) => {
    if (currentMaterialId) return materials[currentMaterialId];
  }
);

export const selectMaterialTags = createSelector(
  [selectMaterialList],
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

export const selectMaterialParts = createSelector(
  [selectCurrentMaterial, selectPartHash],
  (material, partHash) => {
    const partsForMaterial = material?.partIds?.reduce<IPart[]>((acc, partId) => {
      acc.push(partHash[partId]);

      return acc;
    }, []);

    return partsForMaterial;
  }
)