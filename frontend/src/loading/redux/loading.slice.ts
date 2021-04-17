import { AnyAction, createSlice } from "@reduxjs/toolkit";

import {
  isFulfilledMatcher,
  isPendingMatcher,
  isRejectedMatcher,
} from "shared/redux/builder-actions";

import { ILoadingState } from "./loading.types";
import { updateHookPosition } from "hook/redux/hook.thunks";
import { updateSectionChecklist, updateSectionPosition } from "section/redux/section.thunks";
import { updateNotePosition } from "note/redux/note.thunks";
import { updateFlashcard, updateFlashcardPosition } from "flashcard/redux/flashcard.thunks";

// https://www.reddit.com/r/reactjs/comments/8iek94/react_redux_handling_the_loading_of_multiple/
// 0 == not loading
// >0 == loading
const initialState: ILoadingState = {
  loadingCount: 0,
};

const loadingMatcherBlacklist = [
  updateHookPosition.pending.type,
  updateSectionPosition.pending.type,
  updateSectionChecklist.pending.type,
  updateNotePosition.pending.type,
  updateFlashcardPosition.pending.type,
  updateFlashcard.pending.type,
];
function loadingPendingMatcher(action: AnyAction) {
  return !loadingMatcherBlacklist.includes(action.type) && isPendingMatcher(action);
}

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // on all pending actions, start loading
      .addMatcher(loadingPendingMatcher, (state) => {
        state.loadingCount++;
      })
      .addMatcher(isRejectedMatcher, (state) => {
        state.loadingCount--;
      })
      .addMatcher(isFulfilledMatcher, (state) => {
        state.loadingCount--;
      })
  },
});

export const loadingReducer = loadingSlice.reducer;
