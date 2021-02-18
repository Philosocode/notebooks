import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectConcept = (state: TAppState) => state.concept;

export const selectConceptFilters = createSelector(
  [selectConcept],
  (concept) => concept.filters
);

export const selectCurrentConceptTag = createSelector(
  [selectConceptFilters],
  (filters) => filters.tag
);

export const selectConcepts = createSelector(
  [selectConcept],
  (concept) => concept.concepts
);

export const selectConceptsWithCurrentTag = createSelector(
  selectConcepts,
  selectConceptFilters,
  (concepts, filters) => {
    if (filters.isUncategorized) return concepts.filter(c => c.tags.length === 0);
    if (!filters.tag) return concepts;
    return concepts.filter(c => c.tags.includes(filters.tag));
  }
);

export const selectCurrentConcept = createSelector(
  [selectConcept],
  (concept) => {
    if (!concept.currentConceptId) return;
    return concept.concepts.find(c => c.id === concept.currentConceptId);
  }
);

export const selectCurrentConceptHooks = createSelector(
  [selectCurrentConcept],
  (concept) => {
    if (!concept?.hooks) return [];
    return concept.hooks;
  }
)

export const selectConceptTags = createSelector(
  [selectConcepts],
  (concepts) => {
    const tags = new Set<string>();

    concepts.forEach(c => {
      c.tags.forEach(t => {
        tags.add(t);
      });
    });

    return Array.from(tags).sort();
  }
);

export const selectConceptHooks = createSelector(
  [selectCurrentConcept],
  (concept) => {
    if (!concept || !concept.hooks) return [];
    return concept.hooks;
  }
);