import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectConcept = (state: TAppState) => state.concept;

export const selectConcepts = createSelector(
  [selectConcept],
  (concept) => concept.concepts
);

export const selectCurrConcept = createSelector(
  [selectConcept],
  (concept) => concept.currConcept
);
