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

export const selectConceptsWithCurrTag = createSelector(
  selectConcepts,
  selectCurrConceptTag,
  (concepts, tag) => {
    if (!tag) return concepts;
    if (tag === "uncategorized") return concepts.filter(c => c.tags.size === 0);
    return concepts.filter(c => c.tags.has(tag));
  }
)

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