import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentPart } from "part/redux/part.selectors";

const selectFactState = (state: TAppState) => state.fact;

export const selectFactHash = createSelector(
  [selectFactState],
  (state) => state.facts,
);

export const selectFactsForPart = createSelector(
  [selectFactHash, selectCurrentPart],
  (factHash, currentPart) => {
    if (!currentPart?.factIds) return;

    return currentPart.factIds.map(id => factHash[id]);
  }
)