import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { ISection } from "section/redux/section.types";
import { selectSectionHash } from "section/redux/section.selectors";

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

export const selectMaterialSections = createSelector(
  [selectCurrentMaterial, selectSectionHash],
  (material, sectionHash) => {
    const sectionsForMaterial = material?.sectionIds?.reduce<ISection[]>((acc, sectionId) => {
      acc.push(sectionHash[sectionId]);

      return acc;
    }, []);

    return sectionsForMaterial;
  }
)