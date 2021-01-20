import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "redux/store";

const selectLoading = (state: TAppState) => state.loading.loadingCount;

export const selectIsLoading = createSelector(
  [selectLoading],
  (loadingCount) => loadingCount > 0
);
