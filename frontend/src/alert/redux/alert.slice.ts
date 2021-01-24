import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAlertState, ICreateAlertPayload } from "./alert.types";

const initialState: IAlertState = {
  message: "",
  type: "info",
  isShowing: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<ICreateAlertPayload>) => {
      const { message, type } = action.payload;

      state.message = message;
      state.type = type;
      state.isShowing = true;
    },
    hideAlert: (state) => {
      state.isShowing = false;
    },
    clearAlert: () => {
      return initialState;
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const { showAlert, hideAlert, clearAlert } = alertSlice.actions;
