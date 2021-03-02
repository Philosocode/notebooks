import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectPartState = (state: TAppState) => state.part;

export const selectPartHash = createSelector(
  [selectPartState],
  (state) => state.parts,
);