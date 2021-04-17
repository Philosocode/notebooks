import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentPart } from "part/redux/part.selectors";

const selectNoteState = (state: TAppState) => state.note;

export const selectNoteHash = createSelector(
  [selectNoteState],
  (state) => state.notes,
);

export const selectNotesForPart = createSelector(
  [selectNoteHash, selectCurrentPart],
  (noteHash, currentPart) => {
    if (!currentPart?.noteIds) return;
    return currentPart.noteIds.map(id => noteHash[id]);
  }
)