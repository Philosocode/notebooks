import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentPart } from "part/redux/part.selectors";

const selectSectionState = (state: TAppState) => state.section;

export const selectSectionHash = createSelector(
  [selectSectionState],
  (state) => state.sections,
);

export const selectSectionsForPart = createSelector(
  [selectSectionHash, selectCurrentPart],
  (sectionHash, currentPart) => {
    if (!currentPart?.sectionIds) return;
    return currentPart.sectionIds.map(id => sectionHash[id]);
  }
)