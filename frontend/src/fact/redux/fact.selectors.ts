import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentSection } from "section/redux/section.selectors";

const selectFactState = (state: TAppState) => state.fact;

export const selectFactHash = createSelector(
  [selectFactState],
  (state) => state.facts,
);

export const selectFactsForSection = createSelector(
  [selectFactHash, selectCurrentSection],
  (factHash, currentSection) => {
    if (!currentSection?.factIds) return;

    return currentSection.factIds.map(id => factHash[id]);
  }
)