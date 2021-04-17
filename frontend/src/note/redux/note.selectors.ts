import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentSection } from "section/redux/section.selectors";

const selectNoteState = (state: TAppState) => state.note;

export const selectNoteHash = createSelector(
  [selectNoteState],
  (state) => state.notes,
);

export const selectNotesForSection = createSelector(
  [selectNoteHash, selectCurrentSection],
  (noteHash, currentSection) => {
    if (!currentSection?.noteIds) return;
    return currentSection.noteIds.map(id => noteHash[id]);
  }
)