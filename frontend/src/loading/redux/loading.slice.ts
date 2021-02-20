import { AnyAction, createSlice } from "@reduxjs/toolkit";

import {
  isFulfilledMatcher,
  isPendingMatcher,
  isRejectedMatcher,
} from "shared/redux/builder-actions";
import { ILoadingState } from "./loading.types";
import { updateHookPosition } from "../../hook/redux/hook.thunks";
import { getConcepts } from "../../concept/redux/concept.thunks";

// https://www.reddit.com/r/reactjs/comments/8iek94/react_redux_handling_the_loading_of_multiple/
// 0 == not loading
// >0 == loading
const initialState: ILoadingState = {
  authLoaded: false,
  conceptsLoaded: false,
  loadingCount: 0,
};

const loadingMatcherBlacklist = [
  updateHookPosition.pending.type
];

function loadingPendingMatcher(action: AnyAction) {
  return !loadingMatcherBlacklist.includes(action.type) && isPendingMatcher(action);
}

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setAuthLoaded: (state) => {
      state.authLoaded = true;
    },
    setConceptsLoaded: (state) => {
      state.conceptsLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConcepts.fulfilled, (state, action) => {
        if (!state.conceptsLoaded)
          state.conceptsLoaded = true;
      })
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

export const { setAuthLoaded, setConceptsLoaded } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
