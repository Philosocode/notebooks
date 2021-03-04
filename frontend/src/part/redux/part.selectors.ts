import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectPartState = (state: TAppState) => state.part;

export const selectPartHash = createSelector(
  [selectPartState],
  (state) => state.parts,
);

export const selectCurrentPartId = createSelector(
  [selectPartState],
  (state) => state.currentPartId
);

export const selectCurrentPart = createSelector(
  [selectPartHash, selectCurrentPartId],
  (partHash, partId) => {
    if (!partId) return;

    return partHash[partId];
  }
);