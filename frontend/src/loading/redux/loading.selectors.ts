import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectUser } from "auth/redux/auth.selectors";

export const selectLoading = (state: TAppState) => state.loading;

export const selectIsLoading = createSelector(
  [selectLoading],
  (loading) => loading.loadingCount > 0
);

export const selectAppLoaded = createSelector(
  [selectLoading, selectUser],
  (loading, user) => {
    if (!user) return loading.authLoaded;

    return loading.authLoaded && loading.conceptsLoaded;
  }
);