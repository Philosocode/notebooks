import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectSectionState = (state: TAppState) => state.section;

export const selectSectionHash = createSelector(
  [selectSectionState],
  (state) => state.sections,
);

export const selectCurrentSectionId = createSelector(
  [selectSectionState],
  (state) => state.currentSectionId
);

export const selectCurrentSection = createSelector(
  [selectSectionHash, selectCurrentSectionId],
  (sectionHash, sectionId) => {
    if (!sectionId) return;

    return sectionHash[sectionId];
  }
);