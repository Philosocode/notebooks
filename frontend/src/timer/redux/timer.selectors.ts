import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

export const selectTimerState = (state: TAppState) => state.timer;

export const selectTimerModalShowing = createSelector(
  [selectTimerState],
  (state) => state.modalShowing
);
