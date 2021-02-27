import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

export const selectInit = (state: TAppState) => state.init;

export const selectConceptsLoaded = createSelector(
  [selectInit],
  (init) => init.conceptsLoaded
);
export const selectWelcomeScreenShown = createSelector(
  [selectInit],
  (init) => init.welcomeScreenShown
);