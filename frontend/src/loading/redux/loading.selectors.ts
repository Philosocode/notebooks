import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

export const selectLoading = (state: TAppState) => state.loading;

export const selectIsLoading = createSelector(
  [selectLoading],
  (loading) => loading.loadingCount > 0
);

export const selectConceptsLoaded = createSelector(
  [selectLoading],
  (loading) => loading.conceptsLoaded
);