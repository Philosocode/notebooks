import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "redux/store";

const selectAuth = (state: TAppState) => state.auth;

export const selectIsLoggedIn = createSelector(
  [selectAuth],
  (auth) => !!auth.user
);
