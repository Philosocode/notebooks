import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectConcept = (state: TAppState) => state.concept;

export const selectCurrConceptTag = createSelector(
  [selectConcept],
  (concept) => concept.currTag
);

export const selectConcepts = createSelector(
  [selectConcept],
  (concept) => concept.concepts
);

export const selectCurrConcept = createSelector(
  [selectConcept],
  (concept) => concept.currConcept
);

export const selectConceptTags = createSelector(
  [selectConcepts],
  (concepts) => {
    const tags = new Set<string>();

    concepts.forEach(c => {
      c.tags.forEach(t => { tags.add(t) });
    });

    return Array.from(tags).sort();
  }
)