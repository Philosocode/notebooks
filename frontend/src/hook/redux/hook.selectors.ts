import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectHookState = (state: TAppState) => state.hook;

export const selectHookHash = createSelector(
  [selectHookState],
  (state) => state.hooks,
);

export const selectHookList = createSelector(
  [selectHookState],
  (state) => Object.values(state.hooks)
);