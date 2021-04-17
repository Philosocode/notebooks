import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { IFlashcardState } from "./flashcard.types";
import { createFlashcard, deleteFlashcard, getFlashcards, updateFlashcard } from "./flashcard.thunks";

const initialState: IFlashcardState  = {
  flashcards: {}
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFlashcard.fulfilled, (state, action) => {
        const newFlashcard = action.payload.flashcard;

        state.flashcards[newFlashcard.id] = newFlashcard;
      })
      .addCase(getFlashcards.fulfilled, (state, action) => {
        action.payload.flashcards.forEach(flashcard => {
          // add to hash
          state.flashcards[flashcard.id] = flashcard;
        })
      })
      .addCase(updateFlashcard.fulfilled, (state, action) => {
        const { flashcardId, updates } = action.payload;

        const oldFlashcard = state.flashcards[flashcardId];
        if (!oldFlashcard) return;

        state.flashcards[flashcardId] = {
          ...oldFlashcard,
          ...updates,
        }
      })
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        const { flashcardId } = action.payload;

        state.flashcards = omit(state.flashcards, [flashcardId]);
      })
  }
});

export const flashcardReducer = flashcardSlice.reducer;