import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { IConceptLinkWithName } from "./concept.types";

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

export const selectCurrentConceptId = createSelector(
  [selectConcept],
  (state) => state.currentConceptId
);

export const selectCurrentConcept = createSelector(
  [selectConcepts, selectCurrentConceptId],
  (concepts, currentConceptId) =>
    concepts.find(c => c.id === currentConceptId)
);

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
  (currentConcept) => currentConcept?.hooks
);

export const selectConceptLinks = createSelector(
  [selectConcepts, selectCurrentConcept],
  (concepts, currentConcept) => {
    const links = currentConcept?.links;
    if (!links) return;

    // find concepts matching link IDs
    const conceptsForLinks: IConceptLinkWithName[] = [];

    links.forEach(link => {
      const concept = concepts.find(c => c.id === link.concept_id);
      if (!concept) return;

      conceptsForLinks.push({
        ...link,
        concept_name: concept.name,
        created_at: concept.created_at,
        updated_at: concept.updated_at,
      });
    });

    return conceptsForLinks;
  }
);
