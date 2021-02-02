import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";

const selectModal = (state: TAppState) => state.modal;

export const selectModalShowing = createSelector(
  [selectModal],
  (modal) => modal.modalShowing
);
