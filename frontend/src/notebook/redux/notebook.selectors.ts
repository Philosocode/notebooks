import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { ISection } from "section/redux/section.types";
import { selectSectionHash } from "section/redux/section.selectors";

const selectNotebookState = (state: TAppState) => state.notebook;

export const selectNotebookHash = createSelector(
  [selectNotebookState],
  (state) => state.notebooks
);

export const selectNotebookList = createSelector(
  [selectNotebookHash],
  (hash) => Object.values(hash)
);

export const selectCurrentNotebookId = createSelector(
  [selectNotebookState],
  (state) => state.currentNotebookId
);

export const selectCurrentNotebook = createSelector(
  [selectNotebookHash, selectCurrentNotebookId],
  (notebooks, currentNotebookId) => {
    if (currentNotebookId) return notebooks[currentNotebookId];
  }
);

export const selectNotebookTags = createSelector(
  [selectNotebookList],
  (notebooks) => {
    const tags = new Set<string>();

    notebooks.forEach(c => {
      c.tags.forEach(t => {
        tags.add(t);
      });
    });

    return Array.from(tags).sort();
  }
);

export const selectNotebookSections = createSelector(
  [selectCurrentNotebook, selectSectionHash],
  (notebook, sectionHash) => {
    const sectionsForNotebook = notebook?.sectionIds?.reduce<ISection[]>((acc, sectionId) => {
      acc.push(sectionHash[sectionId]);

      return acc;
    }, []);

    return sectionsForNotebook;
  }
)