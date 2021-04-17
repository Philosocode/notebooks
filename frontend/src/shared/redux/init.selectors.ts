import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

export const selectInitState = (state: TAppState) => state.init;

export const selectConceptsLoaded = createSelector(
  [selectInitState],
  (state) => state.conceptsLoaded
);

export const selectNotebooksLoaded = createSelector(
  [selectInitState],
  (state) => state.notebooksLoaded
);

export const selectSettingsLoaded = createSelector(
  [selectInitState],
  (state) => state.settingsLoaded
);

export const selectWelcomeScreenShown = createSelector(
  [selectInitState],
  (state) => state.welcomeScreenShown
);