import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectUserState = (state: TAppState) => state.user;

export const selectIsLoggedIn = createSelector(
  [selectUserState],
  (state) => !!state.user
);

export const selectUser = createSelector(
  [selectUserState],
  (state) => state.user
);

export const selectSettings = createSelector(
  [selectUserState],
  (state) => state.settings
);