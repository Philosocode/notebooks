import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentSection } from "section/redux/section.selectors";

const selectFlashcardState = (state: TAppState) => state.flashcard;

export const selectFlashcardHash = createSelector(
  [selectFlashcardState],
  (state) => state.flashcards,
);

export const selectFlashcardsForSection = createSelector(
  [selectFlashcardHash, selectCurrentSection],
  (flashcardHash, currentSection) => {
    if (!currentSection?.flashcardIds) return;

    return currentSection.flashcardIds.map(id => flashcardHash[id]);
  }
)