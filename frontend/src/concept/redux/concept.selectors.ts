import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectConcept = (state: TAppState) => state.concept;

export const selectConceptFilters = createSelector(
  [selectConcept],
  (concept) => concept.filters
);

export const selectCurrConceptTag = createSelector(
  [selectConceptFilters],
  (filters) => filters.tag
);

export const selectConcepts = createSelector(
  [selectConcept],
  (concept) => concept.concepts
);

export const selectConceptsWithCurrTag = createSelector(
  selectConcepts,
  selectConceptFilters,
  (concepts, filters) => {
    if (filters.isUncategorized) return concepts.filter(c => c.tags.length === 0);
    if (!filters.tag) return concepts;
    return concepts.filter(c => c.tags.includes(filters.tag));
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