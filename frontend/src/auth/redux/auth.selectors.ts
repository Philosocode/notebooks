import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectAuth = (state: TAppState) => state.auth;

export const selectIsLoggedIn = createSelector(
  [selectAuth],
  (auth) => !!auth.user
);

export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);
